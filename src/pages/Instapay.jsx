import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export default function InstaPage() {
  const [balance, setBalance] = useState(0);
  const [showbalanceIndex, setShowBalance] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionIndex, setTransactionIndex] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const ValueInput = useRef();
  const Deposite = () => {
    let date = moment().format("YYYY-MM-DD");
    let time = moment().format("HH:mm:ss A");
    let amount = +ValueInput.current.value;
    let newBalance = balance + amount;
    let newTransaction = {
      beforeBalance: balance,
      Amount: amount,
      type: "deposite",
      AfterBalance: newBalance,
      date: date,
      time: time,
    };
    let copy = [...transaction, newTransaction];
    setTransaction(copy);
    setBalance(newBalance);
    localStorage.setItem("balance", newBalance);
    localStorage.setItem("transactions", JSON.stringify(copy));
    ValueInput.current.value = "";
    Swal.fire({
      title: "Good job!",
      text: "The process completed successfully!",
      icon: "success",
    });
  };

  const Withdraw = () => {
    let date = moment().format("YYYY-MM-DD");
    let time = moment().format("HH:mm:ss A");
    let amount = +ValueInput.current.value;
    if (amount <= balance) {
      let newBalance = balance - amount;
      let newTransaction = {
        beforeBalance: balance,
        Amount: amount,
        type: "withdraw",
        AfterBalance: newBalance,
        date: date,
        time: time,
      };
      let copy = [...transaction, newTransaction];
      setTransaction(copy);
      setBalance(newBalance);
      localStorage.setItem("balance", newBalance);
      localStorage.setItem("transactions", JSON.stringify(copy));
      ValueInput.current.value = "";
      Swal.fire({
        title: "Good job!",
        text: "The process completed successfully!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Not allowed!",
        text: "The amount is greater than your balance.",
        icon: "error",
      });
    }
  };

  const modal = () => {
    if (showbalanceIndex == false) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const deleteProcess = (index) => {
    let copy = [...transaction];
    copy.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(copy));
    setTransaction(copy);
  };

useEffect(() => {
  let balanceOfLocal = +localStorage.getItem("balance") || 0;

  let transactionOfLocal;
  try {
    transactionOfLocal = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
  } catch {
    transactionOfLocal = [];
    localStorage.setItem("transactions", "[]");
  }

  setBalance(balanceOfLocal);
  setTransaction(transactionOfLocal);
}, []);


  return (
    <div className="container w-full flex flex-col gap-4 p-5 md:p-10">
      <h1 className="w-full text-center font-bold text-4xl">
        Hello, Welcome To My InstaPay
      </h1>
      <div className="w-full flex flex-col justify-center px-20 items-center">
        <div className=" w-[360px] md:w-[400px] mt-10 xlg:mt-20 flex p-15 justify-center items-center border-2 rounded-2xl bg-gray-800">
          <div className="flex  gap-10 flex-col ">
            <button
              onClick={() => setShowBalance(!showbalanceIndex)}
              className={`w-full btn ${
                showbalanceIndex ? "btn-warning" : "btn-primary"
              }`}
            >
              {showbalanceIndex ? "Hide Balance" : "Show Balance"}
            </button>

            <h1 className="w-[300px] font-bold text-2xl">
              Balance : {showbalanceIndex ? balance : "****"}
            </h1>

            <button className="btn btn-neutral w-[300px]" onClick={modal}>
              Open Modal
            </button>

            <button
              className="btn btn-primary"
              onClick={() => setTransactionIndex(true)}
            >
              Show Transaction
            </button>
          </div>

          {isModalOpen && (
            <div className="modal modal-open px-5 animate__animated animate__fadeInDown">
              <div className="modal-box w-full flex flex-col gap-6 pt-10">
                <h1 className="text-3xl font-bold">Proccess...</h1>
                <input
                  ref={ValueInput}
                  className="w-full input border"
                  placeholder="Enter Amount process..."
                />
                <button onClick={Deposite} className="w-full btn btn-success">
                  Deposite
                </button>
                <button onClick={Withdraw} className="w-full btn btn-error">
                  Withdraw
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-primary"
                >
                  Save Process and Close Modal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {transactionIndex &&
        (transaction.length == 0 ? (
          <div className="text-3xl">There are no transaction..</div>
        ) : (
          <div className="w-full mt-10">
            <table className="w-full table">
              <thead>
                <tr>
                  <td>#ID</td>
                  <td>Before balance</td>
                  <td>Amount</td>
                  <td>Type</td>
                  <td>After balance</td>
                  <td>Date</td>
                  <td>Time</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {transaction.map((el, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <th>{el.beforeBalance}</th>
                      <th>{el.Amount}</th>
                      <th
                        className={
                          el.type == "withdraw"
                            ? "btn btn-error w-[100px]"
                            : "btn btn-success w-[100px]"
                        }
                      >
                        {el.type}
                      </th>
                      <th>{el.AfterBalance}</th>
                      <th>{el.date}</th>
                      <th>{el.time}</th>
                      <th>
                        <button
                          className="btn btn-error"
                          onClick={() => deleteProcess(index)}
                        >
                          Delete Process
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}
