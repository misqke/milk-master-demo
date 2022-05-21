import { useEffect, useState } from "react";
import {
  Page,
  Title,
  Box,
  TableHeader,
  Form,
  SubmitBtn,
  Image,
  Selector,
  ErrorMsg,
  LoadingMessage,
} from "./styles/components";
import MilkRow from "./components/MilkRow";
import axios from "axios";
import getColor from "./util/getColor";
import getTotal from "./util/getTotal";
import "./styles/app.css";

// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.baseURL = "https://milk-master-demo.herokuapp.com";

export default function App() {
  const [milks, setMilks] = useState([]);
  const [loading, setLoading] = useState(
    milks.length ? "" : "Loading milk data..."
  );
  const [inventory, setInventory] = useState(undefined);
  // const [password, setPassword] = useState("");
  // const [login, setLogin] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const updateMilk = (index, newMilk) => {
    setMilks((prev) => [
      ...prev.slice(0, index),
      newMilk,
      ...prev.slice(index + 1),
    ]);
  };

  const getConfirmation = async () => {
    const { data } = await axios.get(
      `/api/submits/confirmation/?num=${inventory ? "1" : "2"}`
    );
    if (data.data) {
      setConfirmation(data.data);
      setLoading("");
    } else if (data.error) {
      setLoading("");
      setError(data.error);
    } else {
      setTimeout(() => {
        setLoading(data.message);
        getConfirmation();
      }, 10000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (inventory === undefined) {
      setError("Select Inventory or Order");
      return;
    }
    setLoading(`Submitting ${inventory ? "inventory" : "order"}...`);

    const submission = milks.map((milk) => {
      return getTotal(milk);
    });
    let isEmpty = true;
    for (let i = 0; i < submission.length; i++) {
      if (submission[i] !== 0) {
        isEmpty = false;
        break;
      }
    }
    if (isEmpty === true) {
      setError("Please include at least one value");
      setLoading(false);
      return;
    }
    const { data } = await axios.post(
      `/api/submits/${inventory ? "inventory" : "order"}`,
      {
        milks: submission,
        // login,
        // password,
      },
      { timeout: 30000 }
    );
    if (data.message) {
      getConfirmation();
    } else if (data.error) {
      setLoading("");
      setError(data.error);
    }
  };

  // gather milk data at load
  useEffect(() => {
    const getMilkList = async () => {
      const { data } = await axios.get("/api/milks");

      const milkList = [];
      data.forEach((milk) => {
        const color = getColor(milk.name);
        const newMilk = {
          name: milk.name,
          crateMultiplier: Number(milk.crateMultiplier),
          singles: "",
          crates: "",
          stacks: "",
          color,
        };
        milkList.push(newMilk);
      });
      setMilks(milkList);
      setLoading("");
    };

    if (!milks.length) {
      getMilkList();
    }
  }, [milks.length]);

  return (
    <Page>
      <Title>Milk Master v2.0 - DEMO</Title>
      {loading.length > 0 ? (
        <LoadingMessage>{loading}</LoadingMessage>
      ) : confirmation.length > 0 ? (
        <Image src={`data:image/gif;base64, ${confirmation}`} alt="" />
      ) : (
        <Box>
          <TableHeader>
            <span>Name</span>
            <span>Stacks</span>
            <span>Crates</span>
            <span>Singles</span>
            <span>Total</span>
          </TableHeader>
          {error.length > 0 && <ErrorMsg>{error}</ErrorMsg>}
          {milks.map((milk, i) => (
            <MilkRow
              key={milk.name}
              milk={milk}
              index={i}
              updateMilk={updateMilk}
            />
          ))}
          <Form onSubmit={handleSubmit}>
            <Selector>
              <button
                className={`btn ${inventory === true ? "active" : null}`}
                type="button"
                onClick={() => setInventory(true)}
              >
                Inventory
              </button>
              <button
                className={`btn ${inventory === false ? "active" : null}`}
                type="button"
                onClick={() => setInventory(false)}
              >
                Order
              </button>
            </Selector>
            {/* <label htmlFor="login">Dean&apos;s Login</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Deans Login"
            />
            <label htmlFor="password">Dean&apos;s Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Deans Password"
            /> */}
            <SubmitBtn type="submit">submit</SubmitBtn>
          </Form>
        </Box>
      )}
    </Page>
  );
}
