import { useRef, useState } from "react";
import Swal from "sweetalert2";

export default function App() {
  const [balance, setBalance] = useState(5000);
  const [showbalanceIndex, setShowBalance] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionIndex, setTransactionIndex] = useState(false);
  const [transaction, setTransaction] = useState([
    // { beforeBalance: 2000, Amount: 4000, type: "deposite", AfterBalance: 6000 },
    // { beforeBalance: 6000, Amount: 2000, type: "withdraw", AfterBalance: 4000 },
  ]);
  const ValueInput = useRef();

  const Deposite = () => {
    let amount = +ValueInput.current.value;
    let newBalance = balance + amount;
    ValueInput.current.value = "";
    setBalance(newBalance);

    Swal.fire({
      title: "Good job!",
      text: "The process completed successfully!",
      icon: "success",
    });
  };

  const Withdraw = () => {
    let amount = +ValueInput.current.value;
    if (amount <= balance) {
      let newBalance = balance - amount;
      ValueInput.current.value = "";
      setBalance(newBalance);
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
  return (
    <div className="w-full h-dvh overflow-auto flex justify-center bg-gray-900 text-white">
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
                  </tr>
                </thead>
                <tbody>
                  {transaction.map((el, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <th>{el.beforeBalance}</th>
                        <th>{el.Amount}</th>
                        <th>{el.type}</th>
                        <th>{el.AfterBalance}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
}
