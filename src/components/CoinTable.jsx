import { type } from "@testing-library/user-event/dist/type";
// import data from "./data";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button } from "antd";
import styled from "styled-components";

function CoinTable() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const ButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 10px;
    button:nth-child(1) {
      margin-right: 10px;
    }
  `;

  const [currency, setCurrency] = useState("KRW");
  useEffect(() => {
    async function fetchCoinData() {
      setIsLoading(true);
      setIsError(false);
      try {
        const result = await axios(
          "https://api.coinpaprika.com/v1/tickers?quotes=USD,KRW"
        );
        setData(result.data);
        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchCoinData();
  }, []);

  //   const dataSource = [
  //     {
  //       key: "1",
  //       rank: 1,
  //       name: "bitcoin",
  //       symbol: "BTC",
  //       market_cap: "123123",
  //       volume_24h: "asdfasdfas",
  //       percent_change_24h: "asdfasdf",
  //       percent_change_7d: "asdfasdfasd",
  //       price: 100000,
  //     },
  //     {
  //       key: "2",
  //       rank: 2,
  //       name: "ethereum",
  //     },
  //   ];
  const dataSource = data.map((data) => {
    return {
      key: data.id,
      rank: data.rank,
      name: data.name,
      symbol: data.symbol,
      market_cap: data.quotes[currency].market_cap,
      volume_24h: data.quotes[currency].volume_24h,
      percent_change_24h: data.quotes[currency].percent_change_24h,
      percent_change_7d: data.quotes[currency].percent_change_7d,
      price: data.quotes[currency].price,
    };
  });

  function sortNumberByKey(key) {
    return (a, b) => a[key] - b[key];
  }
  // function sortNumberByKey(key) {
  //   if (typeof key == "number") {
  //     console.log(a[key].charCodeAt());
  //     return (a, b) => {
  //       a[key] - b[key];
  //     };
  //   }
  // }

  // function sortByKey(key) {
  //     return (a, b) => {
  //                 // 숫자/문자 비교 방식이 같으므로 둘 다 string 변환하여 비교
  //         const aLower = `${a[key]}`.toLocaleLowerCase("en-US");
  //         const bLower = `${b[key]}`.toLocaleLowerCase("en-US");
  //         return aLower < bLower ? -1 : aLower > bLower ? 1 : 0;
  //     }
  // }

  function sortStringByKey(key) {
    return (a, b) => {
      const aLower = a[key].toLocaleLowerCase("en-US");
      const bLower = b[key].toLocaleLowerCase("en-US");
      return aLower < bLower ? -1 : aLower > bLower ? 1 : 0;
    };
  }

  // } else {
  //   return (a, b) => a.charCodeAt() - b.charCodeAt();
  // }

  //   function sortNumberByKey(key) {
  //       return (a, b) => {
  //           if(a, b) => {

  //       }
  //   }

  const T = 1_000_000_000_000;

  const PercentContainer = styled.p`
    color: ${(props) =>
      props.percent > 0 ? "blue" : props.percent === 0 ? "grey" : "red"};
  `;

  const columns = [
    {
      title: "#",
      dataIndex: "rank",
      key: "rank",
      //   sorter: (a, b) => a.rank - b.rank,
      sorter: sortNumberByKey("rank"),
    },
    {
      title: "종목",
      dataIndex: "name",
      key: "name",
      sorter: sortStringByKey("name"),
    },
    {
      title: "기호",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: `가격 (${currency})`,
      dataIndex: "price",
      key: "price",
      sorter: sortNumberByKey("price"),
    },
    {
      title: "총 시가",
      dataIndex: "market_cap",
      key: "market_cap",
      sorter: sortNumberByKey("market_cap"),
      render: (marketCap) => (
        <p>
          {currency === "KRW" ? "₩" : "$"}
          {(marketCap / T).toFixed(2)}T
        </p>
      ),
    },
    {
      title: "거래량(24H)",
      dataIndex: "volume_24h",
      key: "volume_24h",
      sorter: sortNumberByKey("volume_24h"),
      render: (volume) => (
        <p>
          {currency === "KRW" ? "₩" : "$"}
          {(volume / T).toFixed(2)}T
        </p>
      ),
    },
    {
      title: "변동(24H)",
      dataIndex: "percent_change_24h",
      key: "percent_change_24h",
      sorter: sortNumberByKey("percent_change_24h"),
      render: (p) => <PercentContainer percent={p}>{p}%</PercentContainer>,
    },
    {
      title: "변동(7D)",
      dataIndex: "percent_change_7d",
      key: "percent_change_7d",
      sorter: sortNumberByKey("percent_change_7d"),
      render: (p) => <PercentContainer percent={p}>{p}%</PercentContainer>,
    },
  ];
  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <ButtonsContainer>
        <Button
          onClick={() => setCurrency("KRW")}
          type={currency === "KRW" ? "primary" : "default"}
        >
          원화 (KRW)
        </Button>
        <Button
          onClick={() => setCurrency("USD")}
          type={currency === "USD" ? "primary" : "default"}
        >
          달러 (USD)
        </Button>
      </ButtonsContainer>
      <Table dataSource={dataSource} columns={columns} size={"small"} />;
    </>
  );
}

export default CoinTable;
