    class HorizontalBarsRenderer {
      constructor() { }

      // Find the global max (size + offset) for normalization
	getMaxSize(data) {
		let max = -Infinity;

		for (const entry of data || []) {
			const values = entry?.originalData?.values || [];
			for (const val of values) {
				const items = val?.items || [];
				for (const it of items) {
					
					if (it.size + it.offset > max) {
						max = it.size + it.offset;
					}
				}
			}
		}
		// Falls keine gültigen Größen gefunden wurden, null zurückgeben
		return max === -Infinity ? null : max;
	}
	
      update(data, seriesOptions){
        this._d = data;
        this._o = seriesOptions || {};
      }

      draw(target, priceToCoord) {
		
        const d = this._d;
        if (d && d.bars && d.bars.length) {
          target.useMediaCoordinateSpace(({ context: ctx, mediaSize }) => {
            try {
              let maxLen = this.getMaxSize(d.bars);
              const chartW = mediaSize.width;
              const maxW   = chartW * this._o.maxWidth;  // maximum pixel width = fraction of chart width
              const yPlus  = priceToCoord(this._o.barsPricePoints/2);
              const yMinus = priceToCoord(-this._o.barsPricePoints/2);
              const align = this._o.align || 'right';

              ctx.save();
			
              const deltaPerBar = this._o.barsPricePoints / d.bars.length;
              const thickness = Math.abs(yPlus - yMinus) / d.bars.length;

              // Loop over all bars
              for(let i=0; i<d.bars.length; i++) {
                for (const barGroup of d.bars[i].originalData.values) {
                  if (barGroup) {
					
					for (const it of barGroup.items) {
						// Horizontal scaling
						const off = (it.offset / maxLen) * maxW;
						const frac = Math.max(0, it.size / maxLen);
						const widthPx = Math.max(2, frac * maxW);

						// Left coordinate depends on alignment
						const left = (align === 'left'
									  ? (0 + off)
									  : (Math.round(chartW - widthPx) - off));

						// Vertical coordinate
						const top  = priceToCoord( (barGroup.price + (this._o.barsPricePoints/2)) - (i * deltaPerBar) );

						ctx.fillStyle = it.color;
						ctx.fillRect(left, top, widthPx, thickness);
					
					}
				  
				  }
                }
              }
            } finally {
              ctx.restore();
            }
          });
        }
      }
    }

    class HorizontalBarsSeries {
      constructor(){
        this._r = new HorizontalBarsRenderer();
      }
      renderer(){ return this._r; }
      
	  update(data, options){ this._r.update(data, options); }
	  
      priceValueBuilder(item){
        return item.values.slice(-9).map(element => element.price);
      }
      isWhitespace(it){
        return !it || !it.values || it.values.length <= 0;
      }
      defaultOptions(){
        return {
          barColor: '#4682b4',
          align: 'right',
          maxWidth: 0.25, // max horizontal-bars-width in percent of the total chart-width
          barsPricePoints: 1.0,  // define vertical room for entries
          priceLineVisible:false,
          lastValueVisible:false,
        };
      }
    }