# horizontalbars
Horizontal customSeries for lightweight-charts

The renderer supports:

- **Simple bars** → one bar per price level  
- **Stacked bars** → multiple items stacked horizontally using `offset`  
- **Multiple bars per price** → several bars drawn under each other at the same price  


# Example Setup
```
const chart = LightweightCharts.createChart(document.getElementById('chart'), {
  width: 800,
  height: 400,
});

const series = chart.addCustomSeries(new HorizontalBarsSeries(), {
  align: 'right',       // 'left' or 'right'
  maxWidth: 0.35,       // max bar width as fraction of chart width
  barsPricePoints: 1.0, // vertical room for entries
});
```

# Examples
## Simple Bars
```
seriesSimple.setData([
  // NOTE: "time" is only required by Lightweight-Charts API, not used by renderer
  {
    time: 1,
    values: [
      { price: 30, items: [ { size: 50, offset: 0, color: 'rgba(239,83,80,1)' } ] },
      { price: 34, items: [ { size: 20, offset: 0, color: 'rgba(38,166,154,1)' } ] },
      { price: 41, items: [ { size: 30, offset: 0, color: 'rgba(156,39,176,1)' } ] },
    ]
  }
]);
```

## Stacked Bars
```
seriesStacked.setData([
  // NOTE: "time" is only required by Lightweight-Charts API, not used by renderer
  {
    time: 1,
    values: [
      {
        price: 30,
        items: [
          { size: 50, offset: 0,  color: 'rgba(239,83,80,1)' },
          { size: 30, offset: 50, color: 'rgba(156,39,176,1)' },
          { size: 20, offset: 80, color: 'rgba(38,166,154,1)' }
        ]
      },
      {
        price: 34,
        items: [
          { size: 20, offset: 0,  color: 'rgba(239,83,80,1)' },
          { size: 17, offset: 20, color: 'rgba(156,39,176,1)' },
          { size: 50, offset: 37, color: 'rgba(38,166,154,1)' }
        ]
      },
      {
        price: 41,
        items: [
          { size: 30, offset: 0,  color: 'rgba(239,83,80,1)' },
          { size: 42, offset: 30, color: 'rgba(156,39,176,1)' },
          { size: 20, offset: 72, color: 'rgba(38,166,154,1)' }
        ]
      }
    ]
  }
]);
```

## Multiple Bars per Price
```
seriesMulti.setData([
  // NOTE: "time" is only required by Lightweight-Charts API, not used by renderer
  {
    time: 1,
    values: [
      { price: 35, items: [ { size: 20, offset: 0, color: 'rgba(239,83,80,1)' } ] },
      { price: 40, items: [ { size: 37, offset: 0, color: 'rgba(239,83,80,1)' } ] },
      { price: 41, items: [ { size: 27, offset: 0, color: 'rgba(239,83,80,1)' } ] }
    ]
  },
  {
    time: 2,
    values: [
      { price: 35, items: [ { size: 20, offset: 0,  color: 'rgba(156,39,176,1)' }, { size: 10, offset: 20, color: 'rgba(38,166,154,1)' } ] },
      { price: 40, items: [ { size: 52, offset: 0,  color: 'rgba(156,39,176,1)' }, { size: 10, offset: 52, color: 'rgba(38,166,154,1)' } ] },
      { price: 41, items: [ { size: 42, offset: 0,  color: 'rgba(156,39,176,1)' }, { size: 15, offset: 42, color: 'rgba(38,166,154,1)' } ] }
    ]
  }
]);
```
