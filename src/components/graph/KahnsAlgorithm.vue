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
    <p class="mt-2 text-sm text-gray-500">Kahn's Algorithm Traversal</p>

    <div class="absolute top-4 left-4 bg-white shadow rounded px-4 py-2 text-sm text-gray-800 max-w-[16rem]">
      <h2 class="font-bold mb-1">Queue</h2>
      <div class="flex gap-2 flex-wrap">
        <div
          v-for="id in queueDisplay"
          :key="'q-' + id"
          class="px-2 py-1 bg-blue-100 text-blue-800 rounded"
        >
          {{ id }}
        </div>
      </div>

      <h2 class="font-bold mt-4 mb-1">Topological Order</h2>
      <div class="flex gap-2 flex-wrap">
        <div
          v-for="id in topoOrderDisplay"
          :key="'t-' + id"
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
const kahnSteps = ref([])
const currentStep = ref(-1)

const queueDisplay = computed(() => {
  const step = kahnSteps.value[currentStep.value]
  return step?.queue || []
})

const topoOrderDisplay = computed(() => {
  const step = kahnSteps.value[currentStep.value]
  return step?.order || []
})

let nodes, links, nodeEls, labelEls, simulation, stepIndex = 0

function runKahnsAlgorithm(nodes, links) {
  const inDegree = {}
  const adjList = {}
  const queue = []
  const order = []
  const steps = []

  for (const node of nodes) {
    inDegree[node.id] = 0
    adjList[node.id] = []
  }

  for (const link of links) {
    const sourceId = String(link.source)
    const targetId = String(link.target)
    if (!adjList[sourceId]) adjList[sourceId] = []
    if (!(targetId in inDegree)) continue
    inDegree[targetId]++
    adjList[sourceId].push(targetId)
  }

  for (const node of nodes) {
    if (inDegree[node.id] === 0) {
      queue.push(node.id)
    }
  }

  while (queue.length > 0) {
    const current = queue.shift()
    order.push(current)
    steps.push({ current, queue: [...queue], order: [...order] })

    for (const neighbor of adjList[current]) {
      inDegree[neighbor]--
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor)
      }
    }
  }

  return steps
}

function highlightStep(step) {
  if (!step || !nodeEls) return

  nodeEls.attr('fill', d => {
    if (d.id === step.current) return '#facc15'
    if (step.order.includes(d.id)) return '#3b82f6'
    return '#d1d5db'
  })
}

function nextStep() {
  if (stepIndex < kahnSteps.value.length - 1) {
    stepIndex++
    currentStep.value = stepIndex
    highlightStep(kahnSteps.value[stepIndex])
  }
}

function prevStep() {
  if (stepIndex > 0) {
    stepIndex--
    currentStep.value = stepIndex
    highlightStep(kahnSteps.value[stepIndex])
  }
}

onMounted(() => {
  nodes = [
    { id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' },
    { id: 'E' }, { id: 'F' }, { id: 'G' }, { id: 'H' },
    { id: 'I' }, { id: 'J' }
  ]

  links = [
    { source: 'A', target: 'C' },
    { source: 'B', target: 'C' },
    { source: 'C', target: 'E' },
    { source: 'D', target: 'F' },
    { source: 'E', target: 'F' },
    { source: 'F', target: 'G' },
    { source: 'G', target: 'H' },
    { source: 'H', target: 'I' },
    { source: 'I', target: 'J' }
  ]

  kahnSteps.value = runKahnsAlgorithm(nodes, links)
  stepIndex = 0
  currentStep.value = 0
  highlightStep(kahnSteps.value[0])

  const svg = d3.select(svgRef.value)
  const { width, height } = svgRef.value.getBoundingClientRect()
  const zoomGroup = svg.append('g').attr('class', 'zoom-group')
  svg.call(d3.zoom().on('zoom', (event) => {
    zoomGroup.attr('transform', event.transform)
  }))

  simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(120))
    .force('charge', d3.forceManyBody().strength(-250))
    .force('center', d3.forceCenter(width / 2, height / 2))

  zoomGroup.append('g')
    .attr('stroke', '#aaa')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', 2)
    .attr('marker-end', 'url(#arrow)')

  zoomGroup.append('defs').append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 20)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#aaa')

  nodeEls = zoomGroup.append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 10)
    .attr('fill', '#d1d5db')
    .call(drag(simulation))

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

  function drag(simulation) {
    return d3.drag()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', (event, d) => {
        d.fx = event.x
        d.fy = event.y
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      })
  }
})
</script>
