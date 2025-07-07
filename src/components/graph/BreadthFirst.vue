<template>
  <div class="w-full h-[32rem] flex flex-col items-center justify-center bg-gray-100">
    <!-- Graph -->
    <svg ref="svgRef" class="w-full h-full max-h-[24rem]"></svg>

    <!-- Controls -->
    <div class="mt-4 flex gap-4">
      <button @click="prevStep" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Previous
      </button>
      <button @click="nextStep" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Next
      </button>
    </div>
    <p class="mt-2 text-sm text-gray-500">Click a node to start BFS traversal</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const svgRef = ref(null)
const bfsSteps = ref([])
const currentStep = ref(-1)

let nodes, links, nodeEls, labelEls, simulation, adjList = {}

function runBFS(adjList, startId) {
  const visited = new Set()
  const queue = [startId]
  const steps = []

  while (queue.length > 0) {
    const current = queue.shift()
    steps.push({ visited: [...visited], current, queue: [...queue] })

    if (!visited.has(current)) {
      visited.add(current)
      for (const neighbor of adjList[current] || []) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor)
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
  if (currentStep.value < bfsSteps.value.length - 1) {
    currentStep.value++
    highlightStep(bfsSteps.value[currentStep.value])
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
    highlightStep(bfsSteps.value[currentStep.value])
  }
}

onMounted(() => {
  nodes = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ]

  links = [
    { source: '1', target: '2' },
    { source: '1', target: '3' },
    { source: '2', target: '4' },
    { source: '2', target: '5' }
  ]

  // Build adjacency list
  for (const link of links) {
    const src = link.source
    const tgt = link.target
    if (!adjList[src]) adjList[src] = []
    adjList[src].push(tgt)
  }

  const svg = d3.select(svgRef.value)
  const { width, height } = svgRef.value.getBoundingClientRect()

  simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))

  // Edges
  svg.append('g')
    .attr('stroke', '#aaa')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', 2)

  // Nodes
  nodeEls = svg.append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 10)
    .attr('fill', '#d1d5db')
    .call(drag(simulation))
    .on('click', (event, d) => {
      bfsSteps.value = runBFS(adjList, d.id)
      currentStep.value = 0
      highlightStep(bfsSteps.value[0])
    })

  // Labels
  labelEls = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .join('text')
    .text(d => d.id)
    .attr('font-size', 14)
    .attr('dx', 12)
    .attr('dy', '.35em')

  simulation.on('tick', () => {
    // Edges
    svg.selectAll('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)

    // Node positions
    nodeEls
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)

    // Label positions
    labelEls
      .attr('x', d => d.x)
      .attr('y', d => d.y)
  })

  // Drag behavior
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
