import java.util.*;

/**
 * A highly readable Graph implementation using full variable names.
 * No abbreviations, clear logic, beginner friendly.
*/
public class GraphDemo {

    /** Represents a connection from one vertex to another with a weight. */
    static class GraphEdge<T> {
        T targetVertex;
        int weight;

        GraphEdge(T targetVertex, int weight) {
            this.targetVertex = targetVertex;
            this.weight = weight;
        }

        @Override
        public String toString() {
            return targetVertex + "(" + weight + ")";
        }
    }

    /** Graph class using adjacency list representation. */
    static class Graph<T> {
        private final Map<T, List<GraphEdge<T>>> adjacencyList;
        private final boolean isDirected;

        public Graph(boolean isDirected) {
            this.isDirected = isDirected;
            this.adjacencyList = new HashMap<>();
        }

        public void addVertex(T vertex) {
            adjacencyList.putIfAbsent(vertex, new ArrayList<>());
        }

        public void addEdge(T fromVertex, T toVertex) {
            addEdge(fromVertex, toVertex, 1);
        }

        public void addEdge(T fromVertex, T toVertex, int weight) {
            addVertex(fromVertex);
            addVertex(toVertex);

            adjacencyList.get(fromVertex).add(new GraphEdge<>(toVertex, weight));

            if (!isDirected) {
                adjacencyList.get(toVertex).add(new GraphEdge<>(fromVertex, weight));
            }
        }
        public Set<T> getAllVertices() {
            return adjacencyList.keySet();
        }

        public List<GraphEdge<T>> getNeighbors(T vertex) {
            return adjacencyList.getOrDefault(vertex, Collections.emptyList());
        }

        // -------------------------------------------------------------
        // BFS Traversal
        // -------------------------------------------------------------
        public List<T> breadthFirstSearch(T startingVertex) {
            List<T> traversalOrder = new ArrayList<>();
            if (!adjacencyList.containsKey(startingVertex)) return traversalOrder;

            Set<T> visitedVertices = new HashSet<>();
            Queue<T> queue = new ArrayDeque<>();

            queue.add(startingVertex);
            visitedVertices.add(startingVertex);

            while (!queue.isEmpty()) {
                T currentVertex = queue.poll();
                traversalOrder.add(currentVertex);

                for (GraphEdge<T> neighborEdge : getNeighbors(currentVertex)) {
                    if (!visitedVertices.contains(neighborEdge.targetVertex)) {
                        visitedVertices.add(neighborEdge.targetVertex);
                        queue.add(neighborEdge.targetVertex);
                    }
                }
            }

            return traversalOrder;
        }

        // -------------------------------------------------------------
        // DFS Traversal
        // -------------------------------------------------------------
        public List<T> depthFirstSearch(T startingVertex) {
            List<T> traversalOrder = new ArrayList<>();
            if (!adjacencyList.containsKey(startingVertex)) return traversalOrder;

            Set<T> visitedVertices = new HashSet<>();
            depthFirstSearchHelper(startingVertex, visitedVertices, traversalOrder);
            return traversalOrder;
        }

        private void depthFirstSearchHelper(T vertex, Set<T> visitedVertices, List<T> traversalOrder) {
            visitedVertices.add(vertex);
            traversalOrder.add(vertex);

            for (GraphEdge<T> edge : getNeighbors(vertex)) {
                if (!visitedVertices.contains(edge.targetVertex)) {
                    depthFirstSearchHelper(edge.targetVertex, visitedVertices, traversalOrder);
                }
            }
        }

        // -------------------------------------------------------------
        // Dijkstra's Shortest Path Algorithm
        // -------------------------------------------------------------
        public Map<T, Integer> dijkstraShortestPaths(T sourceVertex) {
            final int INFINITY = Integer.MAX_VALUE / 4;

            Map<T, Integer> distanceMap = new HashMap<>();
            for (T vertex : adjacencyList.keySet()) {
                distanceMap.put(vertex, INFINITY);
            }

            if (!adjacencyList.containsKey(sourceVertex)) return distanceMap;

            distanceMap.put(sourceVertex, 0);

            PriorityQueue<Map.Entry<T, Integer>> priorityQueue =
                new PriorityQueue<>(Comparator.comparingInt(Map.Entry::getValue));

            priorityQueue.add(new AbstractMap.SimpleEntry<>(sourceVertex, 0));
            while (!priorityQueue.isEmpty()) {
                Map.Entry<T, Integer> priorityQueueEntry = priorityQueue.poll();
                T currentVertex = priorityQueueEntry.getKey();
                int currentDistance = priorityQueueEntry.getValue();

                if (currentDistance > distanceMap.get(currentVertex)) continue;

                for (GraphEdge<T> neighbor : getNeighbors(currentVertex)) {
                    int newDistance = currentDistance + neighbor.weight;
                    if (newDistance < distanceMap.get(neighbor.targetVertex)) {
                        distanceMap.put(neighbor.targetVertex, newDistance);
                        priorityQueue.add(new AbstractMap.SimpleEntry<>(neighbor.targetVertex, newDistance));
                    }
                }
            }

            return distanceMap;
        }

        // -------------------------------------------------------------
        // Topological Sort (Kahn's Algorithm)
        // -------------------------------------------------------------
        public List<T> topologicalSort() {
            if (!isDirected)
                throw new IllegalStateException("Topological sorting requires a directed graph.");

            Map<T, Integer> inDegree = new HashMap<>();
            for (T vertex : adjacencyList.keySet()) inDegree.put(vertex, 0);

            for (T vertex : adjacencyList.keySet()) {
                for (GraphEdge<T> edge : getNeighbors(vertex)) {
                    inDegree.put(edge.targetVertex, inDegree.get(edge.targetVertex) + 1);
                }
            }

            Queue<T> queue = new ArrayDeque<>();
            for (T vertex : inDegree.keySet()) {
                if (inDegree.get(vertex) == 0) queue.add(vertex);
            }

            List<T> sortedOrder = new ArrayList<>();
            while (!queue.isEmpty()) {
                T vertex = queue.poll();
                sortedOrder.add(vertex);

                for (GraphEdge<T> edge : getNeighbors(vertex)) {
                    inDegree.put(edge.targetVertex, inDegree.get(edge.targetVertex) - 1);
                    if (inDegree.get(edge.targetVertex) == 0) queue.add(edge.targetVertex);
                }
            }

            return sortedOrder.size() == adjacencyList.size() ? sortedOrder : null;
        }

        // -------------------------------------------------------------
        // Cycle detection for Directed Graphs
        // -------------------------------------------------------------
        public boolean hasDirectedCycle() {
            if (!isDirected)
                throw new IllegalStateException("Directed cycle detection requires a directed graph.");

            final Map<T, Integer> colorMap = new HashMap<>(); // 0 = unvisited, 1 = visiting, 2 = visited

            for (T vertex : adjacencyList.keySet()) colorMap.put(vertex, 0);

            for (T vertex : adjacencyList.keySet()) {
                if (colorMap.get(vertex) == 0 && detectCycleDirected(vertex, colorMap)) return true;
            }

            return false;
        }

        private boolean detectCycleDirected(T vertex, Map<T, Integer> colorMap) {
            colorMap.put(vertex, 1);
            for (GraphEdge<T> edge : getNeighbors(vertex)) {
                int color = colorMap.get(edge.targetVertex);
                if (color == 1) return true;
                if (color == 0 && detectCycleDirected(edge.targetVertex, colorMap)) return true;
            }
            colorMap.put(vertex, 2);
            return false;
        }

        // -------------------------------------------------------------
        // Undirected Cycle Detection (Union-Find)
        // -------------------------------------------------------------
        public boolean hasUndirectedCycle() {
            if (isDirected)
                throw new IllegalStateException("Undirected cycle detection requires an undirected graph.");

            Map<T, Integer> vertexIndexMap = new HashMap<>();
            int index = 0;

            for (T vertex : adjacencyList.keySet()) {
                vertexIndexMap.put(vertex, index++);
            }

            UnionFind unionFind = new UnionFind(vertexIndexMap.size());

            for (T vertex : adjacencyList.keySet()) {
                for (GraphEdge<T> edge : getNeighbors(vertex)) {
                    int indexA = vertexIndexMap.get(vertex);
                    int indexB = vertexIndexMap.get(edge.targetVertex);

                    if (indexA < indexB) {
                        if (!unionFind.union(indexA, indexB)) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }

        // -------------------------------------------------------------
        // Print Adjacency List
        // -------------------------------------------------------------
        public void printGraph() {
            for (T vertex : adjacencyList.keySet()) {
                System.out.print(vertex + " -> ");
                List<GraphEdge<T>> neighborList = getNeighbors(vertex);
                for (int i = 0; i < neighborList.size(); i++) {
                    System.out.print(neighborList.get(i));
                    if (i != neighborList.size() - 1) System.out.print(", ");
                }
                System.out.println();
            }
        }
    }

    // -------------------------------------------------------------
    // Union-Find for Cycle Detection
    // -------------------------------------------------------------
    static class UnionFind {
        int[] parent;
        int[] rank;

        UnionFind(int size) {
            parent = new int[size];
            rank = new int[size];
            for (int i = 0; i < size; i++) parent[i] = i;
        }

        int find(int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        }

        boolean union(int a, int b) {
            int rootA = find(a);
            int rootB = find(b);

            if (rootA == rootB) return false;

            if (rank[rootA] < rank[rootB]) {
                parent[rootA] = rootB;
            } else if (rank[rootA] > rank[rootB]) {
                parent[rootB] = rootA;
            } else {
                parent[rootB] = rootA;
                rank[rootA]++;
            }

            return true;
        }
    }

    // -------------------------------------------------------------
    // Example Demonstration
    // -------------------------------------------------------------
    public static void main(String[] args) {
        Graph<String> directedGraph = new Graph<>(true);
        directedGraph.addEdge("Plan", "Design", 1);
        directedGraph.addEdge("Design", "Build", 1);
        directedGraph.addEdge("Build", "Test", 1);
        directedGraph.addEdge("Test", "Deploy", 1);

        System.out.println("Directed Graph:");
        directedGraph.printGraph();

        System.out.println("\nTopological Sort:");
        System.out.println(directedGraph.topologicalSort());

        System.out.println("\nHas Cycle? " + directedGraph.hasDirectedCycle());

        Graph<String> undirectedGraph = new Graph<>(false);
        undirectedGraph.addEdge("A", "B", 2);
        undirectedGraph.addEdge("A", "C", 5);
        undirectedGraph.addEdge("B", "C", 1);
        undirectedGraph.addEdge("B", "D", 4);
        undirectedGraph.addEdge("C", "D", 1);
        undirectedGraph.addEdge("D", "E", 3);

        System.out.println("\nUndirected Graph:");
        undirectedGraph.printGraph();

        System.out.println("\nBreadth-First Search from A: " + undirectedGraph.breadthFirstSearch("A"));
        System.out.println("Depth-First Search from A: " + undirectedGraph.depthFirstSearch("A"));

        System.out.println("\nDijkstra Distances from A:");
        System.out.println(undirectedGraph.dijkstraShortestPaths("A"));

        System.out.println("\nContains Undirected Cycle? " + undirectedGraph.hasUndirectedCycle());
    }
}
