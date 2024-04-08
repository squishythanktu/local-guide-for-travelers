export const chartOptions = (text: string) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text
      }
    }
  }
}

export const chartData = (
  labels: string[],
  datasetsLabel: string,
  data: unknown[],
  borderColor: string,
  backgroundColor: string
) => {
  return {
    labels,
    datasets: [
      {
        label: datasetsLabel,
        data,
        fill: false,
        borderColor,
        backgroundColor,
        tension: 0.4
      }
    ]
  }
}
