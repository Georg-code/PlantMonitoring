import { useState } from "react"
import { Line } from "react-chartjs-2"



interface DataChartInterface {
    data : any
}
 


export const DataChart = (props : DataChartInterface) => {
    const [data, setData] = useState({
        labels: props.data.map((data : any) => new Date(data.time).toLocaleDateString('de-CH')),
        datasets: [{
            label: 'Bodenfeuchtigkeit',
            data: props.data.map((data : any) => data),
        }]
    })
    return(
    <>
    </>)
}