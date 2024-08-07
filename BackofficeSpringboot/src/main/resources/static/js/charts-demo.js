'use strict';

/* Chart.js docs: https://www.chartjs.org/ */

window.chartColors = {
	green: '#052659', // rgba(117,193,129, 1)
	blue: '#5483B3', // rgba(91,153,234, 1)
	gray: '#a9b5c9',
	text: '#252930',
	border: '#e7e9ed',
	red: '#A23530', // rgba(162, 53, 48, 1)
    orange: '#C55F33', // rgba(197, 95, 51, 1)
    darkGreen: '#2E5A48', // rgba(46, 90, 72, 1)
    lightRed: '#D97C76', // rgba(217, 124, 118, 1)
    lightOrange: '#E39E6F', // rgba(227, 158, 111, 1)
};

/* Random number generator for demo purpose */
var randomDataPoint = function () { return Math.round(Math.random() * 100) };


//Area line Chart Demo

var lineChartConfig = {
	type: 'line',

	data: {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],

		datasets: [{
			label: 'Dataset',
			backgroundColor: "#5483B3",
			borderColor: "#052659",
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint()
			],
		}]
	},
	options: {
		responsive: true,

		legend: {
			display: true,
			position: 'bottom',
			align: 'end',
		},

		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,
			callbacks: {
				label: function (tooltipItem, data) {
					return tooltipItem.value + '%';
				}
			},


		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,

				}
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				},
				ticks: {
					beginAtZero: true,
					userCallback: function (value, index, values) {
						return value.toLocaleString() + '%';
					}
				},
			}]
		}
	}
};



//Bar Chart Demo

var barChartConfig = {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Combined Dataset',
            backgroundColor: [
                "#5483B3",
                "#052659",
                "#5483B3",
                "#052659",
                "#5483B3",
                "#052659",
                "#5483B3"
            ],
            hoverBackgroundColor: [
                "#C1E8FF",
                "#C1E8FF",
                "#C1E8FF",
                "#C1E8FF",
                "#C1E8FF",
                "#C1E8FF",
                "#C1E8FF"
            ],
            data: [
                randomDataPoint(),
                randomDataPoint(),
                randomDataPoint(),
                randomDataPoint(),
                randomDataPoint(),
                randomDataPoint(),
                randomDataPoint()
            ]
        }]
    },
    options: {
        responsive: true,
        legend: {
            position: 'bottom',
            align: 'end',
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            titleMarginBottom: 10,
            bodySpacing: 10,
            xPadding: 16,
            yPadding: 16,
            borderColor: window.chartColors.border,
            borderWidth: 1,
            backgroundColor: '#fff',
            bodyFontColor: window.chartColors.text,
            titleFontColor: window.chartColors.text,
            callbacks: {
                label: function (tooltipItem, data) {
                    return tooltipItem.value + '%';
                }
            }
        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    drawBorder: false,
                    color: window.chartColors.border,
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    drawBorder: false,
                    color: window.chartColors.border,
                },
                ticks: {
                    beginAtZero: true,
                    userCallback: function (value, index, values) {
                        return value + '%';
                    }
                }
            }]
        }
    }
};

var barChartConfig2 = {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Combined Dataset',
            backgroundColor: [
                "#5483B3",
                "#052659",
                "#5483B3",
                "#052659",
                "#5483B3",
                "#052659",
                "#5483B3"
            ],
            hoverBackgroundColor: [
                "#C1E8FF",
                "#C1E8FF",
                "#C1E8FF",
                "#C1E8FF",
                "#C1E8FF",
                "#C1E8FF",
                "#C1E8FF"
            ],
            data: [
                randomDataPoint(),
                randomDataPoint(),
                randomDataPoint(),
                randomDataPoint(),
                randomDataPoint(),
                randomDataPoint(),
                randomDataPoint()
            ]
        }]
    },
    options: {
        responsive: true,
        legend: {
            position: 'bottom',
            align: 'end',
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            titleMarginBottom: 10,
            bodySpacing: 10,
            xPadding: 16,
            yPadding: 16,
            borderColor: window.chartColors.border,
            borderWidth: 1,
            backgroundColor: '#fff',
            bodyFontColor: window.chartColors.text,
            titleFontColor: window.chartColors.text,
            callbacks: {
                label: function (tooltipItem, data) {
                    return tooltipItem.value + '%';
                }
            }
        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    drawBorder: false,
                    color: window.chartColors.border,
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    drawBorder: false,
                    color: window.chartColors.border,
                },
                ticks: {
                    beginAtZero: true,
                    userCallback: function (value, index, values) {
                        return value + '%';
                    }
                }
            }]
        }
    }
};

// Pie Chart Demo

var pieChartConfig = {
	type: 'pie',
	data: {
		datasets: [{
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
			],
			backgroundColor: [
				window.chartColors.green,
				window.chartColors.blue,
				window.chartColors.gray,

			],
			label: 'Dataset 1'
		}],
		labels: [
			'Green',
			'Blue',
			'Gray',
		]
	},
	options: {
		responsive: true,
		legend: {
			display: true,
			position: 'bottom',
			align: 'center',
		},

		tooltips: {
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

			/* Display % in tooltip - https://stackoverflow.com/questions/37257034/chart-js-2-0-doughnut-tooltip-percentages */
			callbacks: {
				label: function (tooltipItem, data) {
					//get the concerned dataset
					var dataset = data.datasets[tooltipItem.datasetIndex];
					//calculate the total of this data set
					var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
						return previousValue + currentValue;
					});
					//get the current items value
					var currentValue = dataset.data[tooltipItem.index];
					//calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
					var percentage = Math.floor(((currentValue / total) * 100) + 0.5);

					return percentage + "%";
				},
			},


		},
	}
};


// Doughnut Chart Demo


var doughnutChartConfig = {
	type: 'doughnut',
	data: {
		datasets: [{
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
			],
			backgroundColor: [
				window.chartColors.green,
				window.chartColors.blue,
				window.chartColors.gray,
				window.chartColors.red,
				window.chartColors.orange, 
				window.chartColors.darkGreen, 
				window.chartColors.lightRed,
    			window.chartColors.lightOrange, 
			],
			label: 'Dataset 1'
		}],
		labels: [
			'Meuble',
			'Loisir',
			'Jouet',
			'Electronique',
			'Cuisine',
			'Outils',
			'Produit Ménager',
			'Fournitures scolaires',
		]
	},
	options: {
		responsive: true,
		legend: {
			display: true,
			position: 'bottom',
			align: 'center',
		},

		tooltips: {
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

			animation: {
				animateScale: true,
				animateRotate: true
			},

			/* Display % in tooltip - https://stackoverflow.com/questions/37257034/chart-js-2-0-doughnut-tooltip-percentages */
			callbacks: {
				label: function (tooltipItem, data) {
					//get the concerned dataset
					var dataset = data.datasets[tooltipItem.datasetIndex];
					//calculate the total of this data set
					var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
						return previousValue + currentValue;
					});
					//get the current items value
					var currentValue = dataset.data[tooltipItem.index];
					//calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
					var percentage = Math.floor(((currentValue / total) * 100) + 0.5);

					return percentage + "%";
				},
			},


		},
	}
};



// Generate charts on load
window.addEventListener('load', function () {

	var lineChartElement = document.getElementById('chart-line');
	if (lineChartElement) {
		var lineChart = lineChartElement.getContext('2d');
		window.myLine = new Chart(lineChart, lineChartConfig);
	}

	var barChartElement = document.getElementById('chart-bar');
	if (barChartElement) {
		var barChart = barChartElement.getContext('2d');
		window.myBar = new Chart(barChart, barChartConfig);
	}

	var barChartElement2 = document.getElementById('chart-bar2');
	if (barChartElement2) {
		var barChart2 = barChartElement2.getContext('2d');
		window.myBar = new Chart(barChart2, barChartConfig2);
	}

	var pieChartElement = document.getElementById('chart-pie');
	if (pieChartElement) {
		var pieChart = pieChartElement.getContext('2d');
		window.myPie = new Chart(pieChart, pieChartConfig);
	}

	var doughnutChartElement = document.getElementById('chart-doughnut');
	if (doughnutChartElement) {
		var doughnutChart = doughnutChartElement.getContext('2d');
		window.myDoughnut = new Chart(doughnutChart, doughnutChartConfig);
	}



});

