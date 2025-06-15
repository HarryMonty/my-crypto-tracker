import React, {useEffect, useState} from 'react';
import axios from 'axios';

function CryptoList() {
    const [coins, setCoins] = useState([]); // 'Coins' hold the list of coins, 'SetCoins' functions to update the list.

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets', { // Request to API
            params: { // Query paramenters
                vs_currency: 'aud',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1,
                sparkline: false
            }
        })
        .then((response) => { // Display coins list 'response.data'
            console.log(response.data);
            setCoins(response.data);
        })
        .catch((error) => { // API Failure Check
            console.error('Data error: ', error);
        });
    }, []); // Empty array to only call API once (rate limiter)

    return ( // JSX HTML Display with Tailwind CSS
        <div>
            <div class="text-white">
                <div class="mx-112 items-center rounded-xl bg-slate-700 p-6 shadow-lg outline outline-offset-1 outline-white/10">
                    <p class="text-xl font-semibold">React.js + Tailwind Practise</p>
                    <p class="text-gray-400">Top 10 Cryptocurrencies from CoinGecko API</p>
                </div>

                <ul class="mt-20 p-5 grid grid-flow-col grid-rows-2 gap-24 gap-x-4">
                    {coins.map((coin) => (
                        <li key={coin.id}>
                            <img class="mx-auto pb-1 w-12 m:w-16 lg:w-26" src={coin.image} alt={coin.name} />
                            <div>
                                <div>
                                    {coin.name} ({coin.symbol.toUpperCase()})
                                </div>
                                <div class="pb-4">
                                    ${coin.current_price.toLocaleString()}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CryptoList;