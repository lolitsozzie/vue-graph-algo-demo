<script setup>
import { computed } from 'vue';
</script>

<template>
  <section class="home-blurb">
    <h1>🧠 Welcome to the Graph Algorithm Demo</h1>
    <p>
      This project is a visual demonstration of how key graph traversal algorithms work in practice. It showcases:
    </p>
    <ul>
      <li><strong>Breadth-First Search (BFS)</strong> – for exploring nodes level by level</li>
      <li><strong>Depth-First Search (DFS)</strong> – for diving deep along each path</li>
      <li><strong>Kahn’s Algorithm</strong> – for topologically sorting directed acyclic graphs</li>
    </ul>
    <p>
      The goal is to make these concepts easier to understand by showing how they behave in real-time on interactive graphs.
    </p>
  </section>

</template>
<style scoped>
.home-blurb {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
}
.home-blurb h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.home-blurb ul {
  padding-left: 1.5rem;
  margin: 1rem 0;
}
</style>
