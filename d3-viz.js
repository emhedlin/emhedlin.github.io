<script>
document.addEventListener("DOMContentLoaded", () => {
  // Only initialize if D3 is loaded and container exists
  if (typeof d3 === 'undefined') return;
  
  const container = d3.select("#d3-visualization");
  if (container.empty()) return;

  // Visualization dimensions
  const width = 500;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  // Create SVG
  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "transparent");

  // Generate sample data points
  const generateData = (n) => {
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      x: Math.random() * (width - 2 * margin.left) + margin.left,
      y: Math.random() * (height - 2 * margin.top) + margin.top,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: 3 + Math.random() * 4,
      color: d3.interpolateViridis(Math.random())
    }));
  };

  const data = generateData(40);

  // Create circles
  const circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.radius)
    .style("fill", d => d.color)
    .style("opacity", 0.7)
    .style("cursor", "pointer");

  // Add hover effects
  circles
    .on("mouseover", function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", d.radius * 1.5)
        .style("opacity", 1);
    })
    .on("mouseout", function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", d.radius)
        .style("opacity", 0.7);
    });

  // Animation loop
  const animate = () => {
    data.forEach(d => {
      // Update position
      d.x += d.vx;
      d.y += d.vy;

      // Bounce off walls
      if (d.x <= margin.left || d.x >= width - margin.right) {
        d.vx *= -1;
        d.x = Math.max(margin.left, Math.min(width - margin.right, d.x));
      }
      if (d.y <= margin.top || d.y >= height - margin.bottom) {
        d.vy *= -1;
        d.y = Math.max(margin.top, Math.min(height - margin.bottom, d.y));
      }
    });

    // Update circle positions
    circles
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    requestAnimationFrame(animate);
  };

  // Start animation
  animate();

  // Clustering effect on click
  svg.on("click", function(event) {
    const [mouseX, mouseY] = d3.pointer(event);
    
    data.forEach(d => {
      const dx = mouseX - d.x;
      const dy = mouseY - d.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        d.vx += dx * 0.01;
        d.vy += dy * 0.01;
      }
    });
  });
});
</script>