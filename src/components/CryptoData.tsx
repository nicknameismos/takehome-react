/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoData = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [userPortfolio, setUserPortfolio] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/coinmarketcap");

        setCryptoData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const userPortfolioData = {
      BTC: {
        name: "Bitcoin",
        price_thb: 1800000,
        amount: 0.5,
      },
      ETH: {
        name: "Ethereum",
        price_thb: 60000,
        amount: 10,
      },
    };

    setUserPortfolio(userPortfolioData);
    fetchData();
  }, []);

  const calculateProfit = (crypto) => {
    if (userPortfolio[crypto.symbol]) {
      const purchasedPrice = userPortfolio[crypto.symbol].price_thb;
      const purchasedAmount = userPortfolio[crypto.symbol].amount;
      const currentPrice = crypto.quote.USD.price;

      const currentTotalValue = currentPrice * purchasedAmount;
      const purchasedTotalValue = purchasedPrice * purchasedAmount;
      const profit = currentTotalValue - purchasedTotalValue;

      return profit.toFixed(2);
    }
    return 0;
  };

  return (
    <div className="crypto-list">
      <h1>Top 100 Cryptocurrencies</h1>
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto, index) => (
            <tr key={index}>
              <td>
                <img src={crypto.logo} width="30" height="30" />
              </td>
              <td>{crypto.name}</td>
              <td>{crypto.quote.USD.price}</td>
              <td>{calculateProfit(crypto)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoData;
