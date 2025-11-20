// Sample data - in production this would be loaded from JSON files
const taxData = {
    han: {
        name: "Han Dynasty",
        period: "206 BCE - 220 CE",
        landTax: 3.33,
        pollTax: 2.5,
        corvee: 2.0,
        total: 7.83,
        gdpPercent: 8.5,
        color: "#dc3545"
    },
    tang: {
        name: "Tang Dynasty", 
        period: "618 - 907 CE",
        landTax: 3.0,
        pollTax: 1.5,
        commercial: 2.0,
        salt: 1.0,
        total: 7.5,
        gdpPercent: 7.5,
        color: "#fd7e14"
    },
    song: {
        name: "Song Dynasty",
        period: "960 - 1279 CE", 
        landTax: 2.0,
        commercial: 5.0,
        salt: 2.5,
        total: 9.5,
        gdpPercent: 10.0,
        color: "#ffc107"
    },
    rome: {
        name: "Roman Empire",
        period: "27 BCE - 476 CE",
        tributum: 5.0,
        indirect: 4.0,
        total: 9.0,
        gdpPercent: 9.0,
        color: "#6610f2"
    },
    byzantine: {
        name: "Byzantine Empire",
        period: "330 - 1453 CE",
        landTax: 4.0,
        commercial: 3.0,
        other: 1.0,
        total: 8.0,
        gdpPercent: 8.0,
        color: "#6f42c1"
    }
};

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTaxBurdenChart();
    initializeTaxTypeChart();
    initializeComparisonChart();
    initializeTimeline();
    populateDataTable();
    setupEventListeners();
});

// Tax Burden Evolution Chart
function initializeTaxBurdenChart() {
    const ctx = document.getElementById('taxBurdenChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Han', 'Tang', 'Song', 'Ming', 'Qing'],
            datasets: [{
                label: 'China',
                data: [8.5, 7.5, 10.0, 8.0, 7.0],
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                tension: 0.4
            }, {
                label: 'Rome/Byzantine',
                data: [9.0, 8.0, 8.5, null, null],
                borderColor: '#6610f2',
                backgroundColor: 'rgba(102, 16, 242, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '% GDP';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 15,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Tax Type Distribution Chart
function initializeTaxTypeChart() {
    const ctx = document.getElementById('taxTypeChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Land Tax', 'Commercial Tax', 'Poll Tax', 'Salt Monopoly', 'Corvée Labor'],
            datasets: [{
                data: [35, 30, 15, 10, 10],
                backgroundColor: [
                    '#dc3545',
                    '#28a745',
                    '#ffc107',
                    '#17a2b8',
                    '#6c757d'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Comparative Analysis Chart
function initializeComparisonChart() {
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Han', 'Tang', 'Song', 'Roman Empire', 'Byzantine'],
            datasets: [{
                label: 'Total Tax Burden (% GDP)',
                data: [8.5, 7.5, 10.0, 9.0, 8.0],
                backgroundColor: [
                    '#dc3545',
                    '#fd7e14',
                    '#ffc107',
                    '#6610f2',
                    '#6f42c1'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const dynasty = Object.values(taxData)[context.dataIndex];
                            return 'Period: ' + dynasty.period;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 12,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });

    // Update chart when checkboxes change
    document.querySelectorAll('.dynasty-check').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateComparisonChart(chart);
        });
    });
}

function updateComparisonChart(chart) {
    const checkedValues = Array.from(document.querySelectorAll('.dynasty-check:checked'))
        .map(cb => cb.value);
    
    const newLabels = [];
    const newData = [];
    const newColors = [];
    
    checkedValues.forEach(key => {
        if (taxData[key]) {
            newLabels.push(taxData[key].name);
            newData.push(taxData[key].gdpPercent);
            newColors.push(taxData[key].color);
        }
    });
    
    chart.data.labels = newLabels;
    chart.data.datasets[0].data = newData;
    chart.data.datasets[0].backgroundColor = newColors;
    chart.update();
}

// Interactive Timeline using D3.js
function initializeTimeline() {
    const width = document.getElementById('timeline-svg').clientWidth;
    const height = 400;
    const margin = {top: 20, right: 30, bottom: 40, left: 60};
    
    const svg = d3.select('#timeline-svg')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    const timelineData = [
        {name: "Han", start: -206, end: 220, y: 1, color: "#dc3545"},
        {name: "Roman Empire", start: -27, end: 476, y: 2, color: "#6610f2"},
        {name: "Tang", start: 618, end: 907, y: 1, color: "#fd7e14"},
        {name: "Byzantine", start: 330, end: 1453, y: 2, color: "#6f42c1"},
        {name: "Song", start: 960, end: 1279, y: 1, color: "#ffc107"},
        {name: "Ming", start: 1368, end: 1644, y: 1, color: "#28a745"},
        {name: "Qing", start: 1644, end: 1912, y: 1, color: "#17a2b8"}
    ];
    
    const xScale = d3.scaleLinear()
        .domain([-500, 2000])
        .range([margin.left, width - margin.right]);
    
    const yScale = d3.scaleBand()
        .domain([1, 2])
        .range([margin.top, height - margin.bottom])
        .padding(0.3);
    
    // Add zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .translateExtent([[0, 0], [width, height]])
        .on('zoom', zoomed);
    
    svg.call(zoom);
    
    // Add axis
    const xAxis = svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat(d => d + ' CE'));
    
    // Add dynasties/empires
    const bars = svg.selectAll('.timeline-bar')
        .data(timelineData)
        .enter()
        .append('g')
        .attr('class', 'timeline-bar');
    
    bars.append('rect')
        .attr('x', d => xScale(d.start))
        .attr('y', d => yScale(d.y))
        .attr('width', d => xScale(d.end) - xScale(d.start))
        .attr('height', yScale.bandwidth())
        .attr('fill', d => d.color)
        .attr('opacity', 0.8)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 1);
            showTooltip(event, d);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            hideTooltip();
        });
    
    bars.append('text')
        .attr('x', d => xScale(d.start) + (xScale(d.end) - xScale(d.start)) / 2)
        .attr('y', d => yScale(d.y) + yScale.bandwidth() / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'white')
        .attr('font-weight', 'bold')
        .text(d => d.name);
    
    function zoomed(event) {
        const newXScale = event.transform.rescaleX(xScale);
        xAxis.call(d3.axisBottom(newXScale).tickFormat(d => d + ' CE'));
        
        bars.selectAll('rect')
            .attr('x', d => newXScale(d.start))
            .attr('width', d => newXScale(d.end) - newXScale(d.start));
        
        bars.selectAll('text')
            .attr('x', d => newXScale(d.start) + (newXScale(d.end) - newXScale(d.start)) / 2);
    }
}

// Zoom controls for timeline
function zoomIn() {
    d3.select('#timeline-svg svg')
        .transition()
        .call(d3.zoom().scaleBy, 1.5);
}

function zoomOut() {
    d3.select('#timeline-svg svg')
        .transition()
        .call(d3.zoom().scaleBy, 0.67);
}

function resetZoom() {
    d3.select('#timeline-svg svg')
        .transition()
        .call(d3.zoom().transform, d3.zoomIdentity);
}

// Data Table Population
function populateDataTable() {
    const tableBody = document.getElementById('dataTableBody');
    const sampleData = [
        {dynasty: "Han Dynasty", period: "156 BCE", type: "Land Tax", rate: "1/30 harvest", gdp: "3.33%", details: "Reform by Emperor Jing"},
        {dynasty: "Han Dynasty", period: "Western Han", type: "Poll Tax", rate: "120 qian", gdp: "2.5%", details: "Adult population tax"},
        {dynasty: "Tang Dynasty", period: "780 CE", type: "Two-Tax System", rate: "Variable", gdp: "7.5%", details: "Major fiscal reform"},
        {dynasty: "Song Dynasty", period: "11th century", type: "Commercial Tax", rate: "3-5%", gdp: "5.0%", details: "Urban market taxes"},
        {dynasty: "Roman Empire", period: "1st century", type: "Tributum", rate: "1% property", gdp: "5.0%", details: "Provincial taxation"},
        {dynasty: "Byzantine Empire", period: "6th century", type: "Land Tax", rate: "Variable", gdp: "4.0%", details: "Justinian reforms"}
    ];
    
    tableBody.innerHTML = sampleData.map(row => `
        <tr>
            <td>${row.dynasty}</td>
            <td>${row.period}</td>
            <td>${row.type}</td>
            <td>${row.rate}</td>
            <td>${row.gdp}</td>
            <td>${row.details}</td>
        </tr>
    `).join('');
}

// Filter functionality
function updateDataExplorer() {
    // This would filter the table based on selected options
    const dynastyFilter = document.getElementById('dynastyFilter').value;
    const taxTypeFilter = document.getElementById('taxTypeFilter').value;
    const timeRange = document.getElementById('timeRange').value;
    
    // Implementation would filter table rows based on these values
    console.log('Filtering data:', {dynastyFilter, taxTypeFilter, timeRange});
    
    // For demo, just show a loading state briefly
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = '<tr><td colspan="6" class="text-center"><span class="loading"></span> Loading filtered data...</td></tr>';
    
    setTimeout(() => {
        populateDataTable();
    }, 500);
}

// Event Listeners
function setupEventListeners() {
    // Time range slider
    const timeRange = document.getElementById('timeRange');
    const timeDisplay = document.getElementById('timeDisplay');
    
    if (timeRange) {
        timeRange.addEventListener('input', function() {
            const year = parseInt(this.value);
            timeDisplay.textContent = year >= 0 ? year + ' CE' : Math.abs(year) + ' BCE';
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Tooltip functions
function showTooltip(event, data) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-custom';
    tooltip.innerHTML = `
        <strong>${data.name}</strong><br>
        Period: ${data.start} to ${data.end} CE<br>
        Duration: ${data.end - data.start} years
    `;
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY - 30 + 'px';
    document.body.appendChild(tooltip);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip-custom');
    if (tooltip) {
        tooltip.remove();
    }
}