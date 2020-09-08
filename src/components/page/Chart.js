import { Bar } from "vue-chartjs";
let yLabels = {
	20: "Slow & Steady",
	40: "Some knowledge",
	60: "Good",
	80: "Great",
	100: "Best ★"
};
let defaults = {
	fontColor: "white",
	gridColor: "#314149",
	fontSize: 12,
	fontFamily: '"Varela Round", sans-serif'
};
export default {
	extends: Bar,
	data() {
		return {
			chartData: {
				labels: [
					"JavaScript/ Typescript",
					"HTML/CSS",
					"Vue.js",
					"Laravel",
					"Photoshop",
					"PHP",
					"mySQL",
				],
				datasets: [
					{
						data: [90, 100, 90, 45, 95, 50, 70],
						backgroundColor: [
							"rgba(29,233,182, 0.9)",
							"rgba(167,255,235, 0.9)",
							"rgba(29,233,182, 0.9)",
							"rgba(167,255,235, 0.9)",
							"rgba(29,233,182, 0.9)",
							"rgba(167,255,235, 0.9)",
							"rgba(29,233,182, 0.9)"
						]
					}
				]
			},
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false
				},
				scales: {
					yAxes: [
						{
							gridLines: {
								color: defaults.gridColor
							},
							ticks: {
								fontColor: defaults.fontColor,
								fontSize: defaults.fontSize,
								fontFamily: defaults.fontFamily,
								beginAtZero: true,
								callback: value => yLabels[value]
							}
						}
					],
					xAxes: [
						{
							gridLines: {
								color: defaults.gridColor
							},
							ticks: {
								fontColor: defaults.fontColor,
								fontSize: defaults.fontSize,
								fontFamily: defaults.fontFamily
							}
						}
					]
				}
			}
		};
	},
	mounted() {
		this.renderChart(this.chartData, this.chartOptions);
	}
};
