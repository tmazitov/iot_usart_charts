<template>
  <div class="moisture_chart_page">
    <button id="connect__button">connect</button>
    <LineChart
      :chartData="chartOneData"
    />
    <p>
      Max value : {{chart.max}}
    </p>
    <p>
      Min value : {{chart.min}}
    </p>
    <LineChart
      :chartData="chartMiddleData"
      :options="{
        scales: {
            min: 0,
            max: 5
          }
      }"
    />
  </div>
</template>

<script>

import { onMounted, reactive, } from 'vue';
import connection from '.../actions/connection.js';
import Stack from '.../actions/stack.js';

import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: 'App',
  components: {
    LineChart
  },
  setup() {

    const chart = reactive({
      counter: 0,
      startTime: 0,
      max: 0,
      min: 0,
    })

    const stackSize = 20
    const stack = reactive(new Stack(stackSize))
    const middleStack = reactive(new Stack(stackSize))

    const usbInfo = [{
      usbVendorId : 0x0483,
      usbProductId : 0x374B
    }]


    const labels = []
    for (let i = 1; i <= stackSize; i++){
      labels.push(i)
    }
    console.log('labels', labels)
    
    const chartOneData = reactive({
      labels: labels,
      datasets: [
        {
          label: 'Moisture sensor',
          data: stack.range(),
          borderColor: '#2a9d8f',
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#264653",
          pointBorderWidth: 3,
          lineTension: 0.5,
          fill: true,
        },
      ],
    });
    
    const chartMiddleData = reactive({
      labels: labels,
      datasets: [
        {
          label: 'Moisture sensor',
          data: middleStack.range(),
          borderColor: '#fca311',
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#264653",
          pointBorderWidth: 3,
          lineTension: 0.5,
          fill: true,

        },
      ],
      
    });

    const chartUpHandler = (currentValue) => {

      chart.max = stack.max()
      chart.min = stack.min()

      if (chart.counter == 0){
        chart.startTime = new Date()
      }


      if (Math.abs(currentValue - chart.max) > 40){
        chart.counter += 1
      } else {
        if (chart.counter != 0){

          let count = chart.counter
          let time = ((new Date).getTime() - chart.startTime.getTime()) / 1000

          let frequency = time / count

          middleStack.add(frequency.toFixed(3))
          chart.counter = 0
        }
      }
    }

    onMounted(() => {

      const button = document.getElementById("connect__button")

      button.addEventListener('click', async function() {
        // Prompt user to select any serial port.
        const port = await navigator.serial.requestPort({filters:usbInfo});
        // Wait for the serial port to open.
        await port.open({ baudRate: 115200 });


        while (port.readable) {
          const reader = port.readable.getReader();
          try {
            let isOpen = true
            while (isOpen) {
              const content = await reader.read();

              const uint8_tArray = content.value
              const done = content.done

              if (done) break

              let moistureValue = connection.osSuccess(uint8_tArray)
              if (moistureValue) {

                stack.add(moistureValue)
                chartUpHandler(moistureValue)
              }
            }
          } catch (error) {
            connection.onError(error)
          } finally {
            reader.releaseLock();
          }
        }
        });

        
    })

    return { chartOneData, chartMiddleData, chart}
  },  
}
</script>

<style>

</style>
