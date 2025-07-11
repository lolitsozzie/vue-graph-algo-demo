<template>
  <div class="w-full h-[40rem] relative flex flex-col items-center justify-center bg-gray-100">
    <svg ref="svgRef" class="w-full h-full max-h-[32rem]"></svg>

    <div class="mt-4 flex gap-4">
      <button @click="prevStep" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Previous
      </button>
      <button @click="nextStep" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Next
      </button>
    </div>
    <p class="mt-2 text-sm text-gray-500">Click a node to start DFS traversal</p>

    <div class="absolute top-4 left-4 bg-white shadow rounded px-4 py-2 text-sm text-gray-800 max-w-[16rem]">
      <h2 class="font-bold mb-1">Stack</h2>
      <div class="flex gap-2 flex-wrap">
        <div
          v-for="id in stackDisplay"
          :key="'s-' + id"
          class="px-2 py-1 bg-purple-100 text-purple-800 rounded"
        >
          {{ id }}
        </div>
      </div>

      <h2 class="font-bold mt-4 mb-1">Visited</h2>
      <div class="flex gap-2 flex-wrap">
        <div
          v-for="id in visitedDisplay"
          :key="'v-' + id"
          class="px-2 py-1 bg-green-100 text-green-800 rounded"
        >
          {{ id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import * as d3 from 'd3'

const svgRef = ref(null)
const dfsSteps = ref([])
const currentStep = ref(-1)

const stackDisplay = computed(() => {
  const step = dfsSteps.value[currentStep.value]
  return step?.stack || []
})

const visitedDisplay = computed(() => {
  const step = dfsSteps.value[currentStep.value]
  return step?.visited || []
})

let nodes, links, nodeEls, labelEls, simulation, adjList = {}

function runDFS(adjList, startId) {
  const visited = new Set()
  const stack = [startId]
  const steps = []

  while (stack.length > 0) {
    const current = stack.pop()
    steps.push({ visited: [...visited], current, stack: [...stack] })

    if (!visited.has(current)) {
      visited.add(current)
      const neighbors = [...(adjList[current] || [])].reverse()
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor)
        }
      }
    }
  }

  return steps
}

function highlightStep(step) {
  if (!step || !nodeEls) return

  nodeEls.attr('fill', d => {
    if (d.id === step.current) return '#facc15' // yellow
    if (step.visited.includes(d.id)) return '#3b82f6' // blue
    return '#d1d5db' // gray
  })
}

function nextStep() {
  if (currentStep.value < dfsSteps.value.length - 1) {
    currentStep.value++
    highlightStep(dfsSteps.value[currentStep.value])
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
    highlightStep(dfsSteps.value[currentStep.value])
  }
}

onMounted(() => {
  nodes = [
    { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' },
    { id: '5' }, { id: '6' }, { id: '7' }, { id: '8' },
    { id: '9' }, { id: '10' }, { id: '11' }, { id: '12' }
  ]

  links = [
    { source: '1', target: '2' },
    { source: '1', target: '3' },
    { source: '2', target: '4' },
    { source: '2', target: '5' },
    { source: '3', target: '6' },
    { source: '3', target: '7' },
    { source: '4', target: '8' },
    { source: '5', target: '9' },
    { source: '6', target: '10' },
    { source: '7', target: '11' },
    { source: '11', target: '12' }
  ]

  for (const link of links) {
    const [a, b] = [link.source, link.target]
    if (!adjList[a]) adjList[a] = []
    if (!adjList[b]) adjList[b] = []
    adjList[a].push(b)
    adjList[b].push(a)
  }

  const svg = d3.select(svgRef.value)
  const { width, height } = svgRef.value.getBoundingClientRect()
  const zoomGroup = svg.append('g').attr('class', 'zoom-group')
  svg.call(d3.zoom().on('zoom', (event) => {
    zoomGroup.attr('transform', event.transform)
  }))

  simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))

  zoomGroup.append('g')
    .attr('stroke', '#aaa')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', 2)

  nodeEls = zoomGroup.append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 10)
    .attr('fill', '#d1d5db')
    .call(drag(simulation))
    .on('click', (event, d) => {
      dfsSteps.value = runDFS(adjList, d.id)
      currentStep.value = 0
      highlightStep(dfsSteps.value[0])
    })

  labelEls = zoomGroup.append('g')
    .selectAll('text')
    .data(nodes)
    .join('text')
    .text(d => d.id)
    .attr('font-size', 14)
    .attr('dx', 12)
    .attr('dy', '.35em')

  simulation.on('tick', () => {
    zoomGroup.selectAll('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)

    nodeEls
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)

    labelEls
      .attr('x', d => d.x)
      .attr('y', d => d.y)
  })

  setTimeout(() => {
    const bounds = zoomGroup.node().getBBox()
    const fullWidth = svgRef.value.clientWidth
    const fullHeight = svgRef.value.clientHeight

    const scale = 0.9 / Math.max(bounds.width / fullWidth, bounds.height / fullHeight)
    const translateX = (fullWidth - bounds.width * scale) / 2 - bounds.x * scale
    const translateY = (fullHeight - bounds.height * scale) / 2 - bounds.y * scale

    svg.transition().duration(500).call(
      d3.zoom().transform,
      d3.zoomIdentity.translate(translateX, translateY).scale(scale)
    )
  }, 500)

  function drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event, d) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
  }
})
</script>
