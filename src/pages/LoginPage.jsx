import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function loginpage() {
  const navigate = useNavigate();
  const handelSubmit = (values) => {
    let data = true;
    if (data) {
      toast.success("Login Success !");
      navigate("/insta");
      if(values.rememberIndex == true){
        localStorage.setItem("hasLogged", true)
      }else{
      sessionStorage.setItem("hasLogged", true);
      }
    } else {
      toast.error("Wrong User Email Or Password !");
    }
  };

  useEffect(() => {
    let hasLogged = localStorage.getItem("hasLogged") || sessionStorage.getItem("hasLogged");
    if (hasLogged == "true") {
      navigate("/insta");
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(4),
    rememberIndex: Yup.boolean().required(),
  });
  return (
    <div>
      <div className="w-full h-dvh flex justify-center">
        <div className="container flex justify-center items-center">
          <Formik
            validationSchema={validationSchema}
            initialValues={{ email: "", password: "", rememberIndex: false }}
            onSubmit={handelSubmit}
          >
            <Form className="w-[400px] shadow-2xl rounded-3xl flex flex-col bg-gray-700 p-4 gap-4">
              <h1 className="w-full text-center font-bold text-3xl">Sign In</h1>
              <Field
                name="email"
                type="text"
                className="w-full input"
                placeholder="Enter Your Email"
              />
              <ErrorMessage
                name="email"
                className="text-red-400 "
                component={"p"}
              />
              <Field
                name="password"
                type="password"
                className="w-full input"
                placeholder="Enter Your password"
              />
              <ErrorMessage
                name="password"
                className="text-red-400 "
                component={"p"}
              />
              <label className="flex gap-3 items-center font-bold text-xl">
                <Field
                  name="rememberIndex"
                  className="checkbox checkbox-primary"
                  type="checkbox"
                />
                Remember Me
              </label>
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
