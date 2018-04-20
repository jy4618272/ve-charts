import { getDataset } from '../../utils'

function getLineTooltip(args) {
  return {
    trigger: 'axis'
  }
}

function getLineLegend(args) {
  const { settings } = args
  const { legendType = 'plain', legendPadding = 5 } = settings
  return {
    type: legendType,
    padding: legendPadding
  }
}

function getLineDimAxis(args) {
  const { settings } = args
  const type = settings.yAxisType || 'category'
  return {
    type,
    boundaryGap: false,
    axisTick: {
      show: false
    },
    axisLabel: {
      margin: 10,
      fontWeight: 400
    }
  }
}

function getLineMeaAxis(args) {
  const { settings } = args
  const { yAxisScale } = settings

  return {
    type: 'value',
    scale: yAxisScale,
    axisTick: {
      show: false
    },
    axisLabel: {
      margin: 10,
      fontWeight: 400
      // formatter: (v) => formatMeasure(v)
    }
  }
}

// build label
function getLineLabel(args) {
  const {
    fontFamily = 'sans-serif',
    fontSize = '12',
    fontWeight = 'normal',
    position = 'top',
    ...others
  } = args
  return {
    normal: {
      fontFamily,
      fontSize,
      fontWeight,
      position,
      ...others
    }
  }
}

function getLineSeries(args) {
  const { data, settings } = args
  const { measures } = data
  const {
    label = {},
    showSymbol = true,
    smooth = false,
    stack = null,
    step = null,
    symbol = 'emptyCircle',
    symbolSize = 4,
    ...others
  } = settings
  const series = []

  function getLineStyle(lineParams) {
    return {
      normal: {
        width: 2
      }
    }
  }

  measures.forEach(({ name, data }, i) => {
    series.push({
      type: 'line',
      name,
      label: getLineLabel(label),
      lineStyle: getLineStyle(),
      showSymbol,
      smooth,
      stack,
      step,
      symbol,
      symbolSize,
      ...others
    })
  })

  return series
}

export const line = (data, settings, extra) => {
  const { tooltipVisible, legendVisible } = extra

  const dataset = getDataset(data)

  const tooltip = tooltipVisible && getLineTooltip()

  const legend = legendVisible && getLineLegend({ settings })

  const xAxis = getLineDimAxis({ settings })

  const yAxis = getLineMeaAxis({ settings })

  const series = getLineSeries({ data, settings })

  // build echarts options
  const options = {
    dataset,
    tooltip,
    legend,
    xAxis,
    yAxis,
    series
  }

  // console.log(options)

  return options
}
