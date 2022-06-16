import * as types from "./actionTypes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getUsers1 = (users) => ({
  type: types.GET_USER,
  payload: users,
});
const getSingleUsers1 = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});
const postUsersSignUp1 = (users) => ({
  type: types.POST_USER_SIGNUP,
  payload: users,
});
const postUsersLogIn1 = (users) => ({
  type: types.POST_USER_LOGIN,
  payload: users,
});
const updateUser1 = () => ({
  type: types.UPDATE_USER,
});
const deleteUser1 = () => ({
  type: types.DELETE_USER,
});
const errMess = (err) => ({
  type: types.ERROR_USER,
  payload: err,
});
const getData1 = (users) => ({
  type: types.GET_DATA,
  payload: users,
});
const getSingleData1 = (data) => ({
  type: types.GET_SINGLE_DATA,
  payload: data,
});
const postData1 = () => ({
  type: types.POST_DATA,
});
const updateData1 = () => ({
  type: types.UPDATE_DATA,
});
const deleteData1 = () => ({
  type: types.DELETE_DATA,
});
const showComment1 = (comment) => ({
  type: types.SHOW_COMMENT,
  payload: comment,
});
const postComment1 = () => ({
  type: types.ADD_COMMENT,
});
const showLike1 = (like) => ({
  type: types.SHOW_LIKE,
  payload: like,
});
const postLike1 = () => ({
  type: types.ADD_LIKE,
});
const showFeed1 = (feed) => ({
  type: types.SHOW_FEED,
  payload: feed,
});
const showSingleFeed1 = (feed) => ({
  type: types.SHOW_SINGLE_FEED,
  payload: feed,
});
const addFeed1 = () => ({
  type: types.ADD_FEED,
});
const updateFeed1 = () => ({
  type: types.UPDATE_FEED,
});
const deleteFeed1 = () => ({
  type: types.DELETE_FEED,
});

//https://celestial-blog-backend.herokuapp.com
//https://celestial-blog-backend.herokuapp.com
export const getUsers = () => {
  return function (dispatch) {
    axios
      .get(`https://celestial-blog-backend.herokuapp.com/api/allusers`)
      .then((res) => {
        dispatch(getUsers1(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getSingleUsers = (id) => {
  return function (dispatch) {
    axios
      .get(`https://celestial-blog-backend.herokuapp.com/api/allusers/${id}`)
      .then((res) => {
        dispatch(getSingleUsers1(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const postUsersSignUp = (data1) => {
  return function (dispatch) {
    axios
      .post(
        `https://celestial-blog-backend.herokuapp.com/api/register-user`,
        data1
      )
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          dispatch(postUsersSignUp1(res.data));
          console.log(res.data);
          localStorage.setItem("bloguser id", res.data.result._id);
          localStorage.setItem("bloguser email", res.data.result.email);
          window.location = `/personal/${res.data.result._id}`;
        } else {
          dispatch(errMess("No Data Found"));
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          if (error.response.data.error.errors.email.message) {
            var error1 = error.response.data.error.errors.email.message;
            dispatch(errMess(error1));
          }
        } else if (error.request) {
          console.log("error request", error.request);
          dispatch(errMess("Holy crap !!!! server crashed...."));
        } else {
          dispatch(errMess("email is okay i guess"));
        }
      });
  };
};
export const postUsersLogIn = (data1) => {
  return function (dispatch) {
    axios
      .post(
        `https://celestial-blog-backend.herokuapp.com/api/signin-user`,
        data1,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true",
          },
        }
      )
      .then((res) => {
        if (res.data) {
          dispatch(postUsersLogIn1(res.data));
          var loginsuccess = res.data.message;
          var userid = res.data.msg._id;
          var username = res.data.msg.email;
          if (loginsuccess === "User authenticated") {
            localStorage.setItem("bloguser email", username);
            localStorage.setItem("bloguser id", userid);
            window.location = `/personal/${userid}`;
          } else {
            alert("every body is chilling baby");
          }
        } else {
          dispatch(errMess("no data found"));
        }
      })
      .catch((error) => {
        if (error.response) {
          var error1 = error.response.data.message;
          dispatch(errMess(error1));
        } else if (error.request) {
          dispatch(errMess("Holy crap !!!! server crashed...."));
        } else {
          dispatch(errMess("Email doesnt exists or internal server error"));
        }
      });
  };
};
export const updateUser = (id, data4) => {
  return function (dispatch) {
    axios
      .put(
        `https://celestial-blog-backend.herokuapp.com/api/allusers/${id}`,
        data4
      )
      .then((res) => {
        dispatch(updateUser1());
        dispatch(getData1());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`https://celestial-blog-backend.herokuapp.com/api/allusers/${id}`)
      .then((res) => {
        dispatch(deleteUser1());
        dispatch(getData1());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getData = () => {
  return function (dispatch) {
    axios
      .get(`https://celestial-blog-backend.herokuapp.com/api/blogdata`)
      .then((res) => {
        dispatch(getData1(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getSingleData = (id) => {
  return function (dispatch) {
    axios
      .get(`https://celestial-blog-backend.herokuapp.com/api/blogdata/${id}`)
      .then((res) => {
        dispatch(getSingleData1(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const postData = (data4) => {
  return function (dispatch) {
    axios
      .post(`https://celestial-blog-backend.herokuapp.com/api/blogdata`, data4)
      .then((res) => {
        dispatch(postData1());
        dispatch(getData1());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const updateData = (id, data4) => {
  return function (dispatch) {
    axios
      .put(
        `https://celestial-blog-backend.herokuapp.com/api/blogdata/${id}`,
        data4
      )
      .then((res) => {
        dispatch(updateData1());
        dispatch(getData1());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const deleteData = (id) => {
  return function (dispatch) {
    axios
      .delete(`https://celestial-blog-backend.herokuapp.com/api/blogdata/${id}`)
      .then((res) => {
        dispatch(deleteData1());
        dispatch(getData1());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const showComment = () => {
  return function (dispatch) {
    axios
      .get(`https://celestial-blog-backend.herokuapp.com/api/comments`)
      .then((res) => {
        dispatch(showComment1(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const postComment = (data) => {
  return function (dispatch) {
    axios
      .post(`https://celestial-blog-backend.herokuapp.com/api/comments`, data)
      .then((res) => {
        dispatch(postComment1());
        dispatch(showComment1());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const showLike = () => {
  return function (dispatch) {
    axios
      .get(`https://celestial-blog-backend.herokuapp.com/api/likes`)
      .then((res) => {
        dispatch(showLike1(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const postLike = (data) => {
  return function (dispatch) {
    axios
      .post(`https://celestial-blog-backend.herokuapp.com/api/likes`, data)
      .then((res) => {
        dispatch(postLike1());
        dispatch(showLike1());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const showFeed = () => {
  return function (dispatch) {
    axios
      .get(`https://celestial-blog-backend.herokuapp.com/api/dailyfeed`)
      .then((res) => {
        dispatch(showFeed1(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const showSingleFeed = (id) => {
  return function (dispatch) {
    axios
      .get(`https://celestial-blog-backend.herokuapp.com/api/dailyfeed/${id}`)
      .then((res) => {
        dispatch(showSingleFeed1(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const addFeed = (data4) => {
  return function (dispatch) {
    axios
      .post(`https://celestial-blog-backend.herokuapp.com/api/dailyfeed`, data4)
      .then((res) => {
        dispatch(addFeed1());
        dispatch(showFeed1());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const updateFeed = (id, data4) => {
  return function (dispatch) {
    axios
      .put(
        `https://celestial-blog-backend.herokuapp.com/api/dailyfeed/${id}`,
        data4
      )
      .then((res) => {
        dispatch(updateFeed1());
        dispatch(showFeed1());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const deleteFeed = (id) => {
  return function (dispatch) {
    axios
      .delete(
        `https://celestial-blog-backend.herokuapp.com/api/dailyfeed/${id}`
      )
      .then((res) => {
        dispatch(deleteFeed1());
        dispatch(showFeed1());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
