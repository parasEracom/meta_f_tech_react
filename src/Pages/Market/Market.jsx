import React, { useEffect } from 'react';

const Market = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
        script.async = true;
        script.innerHTML = `{
  "colorTheme": "dark",
  "dateRange": "12M",
  "showChart": true,
  "locale": "in",
  "width": "100%",
  "height": "100%",
  "largeChartUrl": "",
  "isTransparent": true,
  "showSymbolLogo": true,
  "showFloatingTooltip": false,
  "plotLineColorGrowing": "#73BA3F",
  "plotLineColorFalling": "#73BA3F",
  "gridLineColor": "rgba(240, 243, 250, 0)",
  "scaleFontColor": "rgba(106, 109, 120, 1)",
  "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
  "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
  "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
  "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
  "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
  "tabs": [
    {
      "title": "Indices",
      "symbols": [
        {
          "s": "FOREXCOM:SPXUSD",
          "d": "S&P 500"
        },
        {
          "s": "FOREXCOM:NSXUSD",
          "d": "US 100"
        },
        {
          "s": "FOREXCOM:DJI",
          "d": "Dow 30"
        },
        {
          "s": "INDEX:NKY",
          "d": "Nikkei 225"
        },
        {
          "s": "INDEX:DEU40",
          "d": "DAX Index"
        },
        {
          "s": "FOREXCOM:UKXGBP",
          "d": "UK 100"
        },
        {
          "s": "BSE:SENSEX",
          "d": " S&P BSE SENSEX"
        },
        {
          "s": "NSE:CNXAUTO",
          "d": "NIFTY AUTO"
        },
        {
          "s": "NSE:CNXMETAL",
          "d": "NIFTY AUTO"
        },
        {
          "s": "CAPITALCOM:DXY",
          "d": " US DOLLAR INDEX"
        },
        {
          "s": "PEPPERSTONE:US30",
          "d": " US DOLLAR INDEX"
        }
      ],
      "originalTitle": "Indices"
    },
    {
      "title": "Futures",
      "symbols": [
        {
          "s": "CME_MINI:ES1!",
          "d": "S&P 500"
        },
        {
          "s": "CME:6E1!",
          "d": "Euro"
        },
        {
          "s": "COMEX:GC1!",
          "d": "Gold"
        },
        {
          "s": "NYMEX:CL1!",
          "d": "Crude Oil"
        },
        {
          "s": "NYMEX:NG1!",
          "d": "Natural Gas"
        },
        {
          "s": "CBOT:ZC1!",
          "d": "Corn"
        },
        {
          "s": "MCX:NATURALGAS1!",
          "d": " US DOLLAR INDEX"
        },
        {
          "s": "MCX:SILVER1!",
          "d": " US DOLLAR INDEX"
        }
      ],
      "originalTitle": "Futures"
    },
    {
      "title": "Forex",
      "symbols": [
        {
          "s": "FX:EURUSD",
          "d": "EUR/USD"
        },
        {
          "s": "FX:GBPUSD",
          "d": "GBP/USD"
        },
        {
          "s": "FX:USDJPY",
          "d": "USD/JPY"
        },
        {
          "s": "FX:USDCHF",
          "d": "USD/CHF"
        },
        {
          "s": "FX:AUDUSD",
          "d": "AUD/USD"
        },
        {
          "s": "FX:USDCAD",
          "d": "USD/CAD"
        },
        {
          "s": "FX_IDC:USDINR ",
          "d": "U.S. DOLLAR / INDIAN RUPEE"
        },
        {
          "s": "FX:EURUSD",
          "d": " EURO FX/U.S. DOLLAR"
        },
        {
          "s": "OANDA:GBPUSD",
          "d": "GBP/USD"
        },
        {
          "s": "FX:USDJPY",
          "d": "U.S. DOLLAR/JAPANESE YEN"
        },
        {
          "s": "FOREXCOM:EURUSD",
          "d": "U.S. DOLLAR/JAPANESE YEN"
        },
        {
          "s": "FOREXCOM:GBPUSD",
          "d": "BRITISH POUND / U.S. DOLLAR"
        },
        {
          "s": "FX:AUDUSD",
          "d": "BRITISH POUND / U.S. DOLLAR"
        },
        {
          "s": "OANDA:CADJPY",
          "d": "CAD/JPY"
        },
        {
          "s": "OANDA:NZDCAD",
          "d": "NZD/CAD"
        },
        {
          "s": "OANDA:EURNZD",
          "d": "NZD/CAD"
        },
        {
          "s": "FOREXCOM:USDCAD",
          "d": "U.S. DOLLAR / CANADIAN DOLLAR"
        },
        {
          "s": "EIGHTCAP:AUDUSD",
          "d": " AUSTRALIAN DOLLAR / US DOLLAR"
        },
        {
          "s": "OANDA:GBPCAD",
          "d": " GBP/CAD"
        },
        {
          "s": "FX:EURGBP",
          "d": " EURO FX/BRITISH POUND"
        },
        {
          "s": "FOREXCOM:EURCHF",
          "d": " EURO FX/BRITISH POUND"
        },
        {
          "s": "EASYMARKETS:NZDCAD",
          "d": "NEW ZEALAND DOLLAR / CANADIAN DOLLAR"
        },
        {
          "s": "OANDA:NZDUSD",
          "d": " NZD/USD"
        },
        {
          "s": "PEPPERSTONE:GBPUSD",
          "d": "BRITISH POUND VS US DOLLAR"
        },
        {
          "s": "FX:USDCNH",
          "d": "U.S. DOLLAR/CHINESE YUAN"
        },
        {
          "s": "FOREXCOM:EURCHF",
          "d": "U.S. DOLLAR/CHINESE YUAN"
        }
      ],
      "originalTitle": "Forex"
    },
    {
      "title": "Crypto",
      "symbols": [
        {
          "s": "BINANCE:BTCUSDT",
          "d": " BITCOIN / TETHERUS"
        },
        {
          "s": "BITSTAMP:BTCUSD",
          "d": " BITCOIN / TETHERUS"
        },
        {
          "s": "BINANCE:BTCUSDT.P",
          "d": "BITCOIN / TETHERUS PERPETUAL CONTRACT"
        },
        {
          "s": "BINANCE:ETHUSDT",
          "d": "ETHEREUM / TETHERUS"
        },
        {
          "s": "BINANCE:SOLUSDT",
          "d": " SOL / TETHERUS"
        },
        {
          "s": "BITSTAMP:LTCUSD",
          "d": "LITECOIN / U.S. DOLLAR"
        },
        {
          "s": "BINANCE:BTCUSD",
          "d": " BITCOIN / US DOLLAR"
        },
        {
          "s": "BINANCE:BCHUSDT",
          "d": " BITCOIN CASH / TETHERUS"
        },
        {
          "s": "BINANCE:BNBUSDT.P",
          "d": " BINANCE COIN / TETHERUS PERPETUAL CONTRACT"
        },
        {
          "s": "BINANCE:PEPEUSDT",
          "d": " PEPE / TETHERUS"
        },
        {
          "s": "BINANCE:SHIBUSDT",
          "d": "SHIB / TETHERUS"
        },
        {
          "s": "BINANCE:INJUSDT",
          "d": " INJ / TETHERUS"
        },
        {
          "s": "BINANCE:GALAUSDT",
          "d": " GALA / TETHERUS"
        },
        {
          "s": "BINANCE:ATOMUSDT",
          "d": " COSMOS / TETHERUS"
        },
        {
          "s": "BINANCE:OPUSDT",
          "d": " COSMOS / TETHERUS"
        },
        {
          "s": "BINANCE:ADAUSDT.P",
          "d": "CARDANO / TETHERUS PERPETUAL CONTRACT"
        },
        {
          "s": "BINANCE:SXPUSDT",
          "d": " SXP / TETHERUS"
        },
        {
          "s": "BINANCE:TOMOUSDT",
          "d": "TOMOCHAIN / TETHERUS"
        },
        {
          "s": "CRYPTO:BTCUSD",
          "d": " BITCOIN"
        },
        {
          "s": "BINANCE:ETHUSDT",
          "d": " ETHEREUM / TETHERUS"
        },
        {
          "s": "BITSTAMP:ETHUSD",
          "d": "ETHEREUM / U.S. DOLLAR"
        },
        {
          "s": "BINANCE:MATICUSDT",
          "d": "MATIC NETWORK / TETHERUS"
        },
        {
          "s": "BINANCE:DOTUSDT",
          "d": "MATIC NETWORK / TETHERUS"
        },
        {
          "s": "BINANCE:CHZUSDT",
          "d": " CHILIZ / TETHERUS"
        },
        {
          "s": "BINANCE:WAVESUSDT.P",
          "d": "WAVES / TETHERUS PERPETUAL CONTRACT"
        },
        {
          "s": "PYTH:XAUUSD",
          "d": " GOLD VS US DOLLAR"
        },
        {
          "s": "BINANCE:COMPUSDT",
          "d": "COMP / TETHERUS"
        },
        {
          "s": "BINANCE:ADAUSDT.P",
          "d": "COMP / TETHERUS"
        }
      ]
    }
  ]

    }`;

        const widgetContainer = document.getElementsByClassName('tradingview-widget-container__widget')[0];
        if (widgetContainer) {
            widgetContainer.appendChild(script);
        }

        return () => {
            if (widgetContainer && script.parentNode === widgetContainer) {
                widgetContainer.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="dashboard">
            <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget"></div>
                <div className="tradingview-widget-copyright">
                    <a href="https://in.tradingview.com/" rel="noopener noreferrer nofollow" target="_blank"></a>
                </div>
            </div>
        </div>
    );
};

export default Market;
