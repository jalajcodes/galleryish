import React, { useState } from "react";
import Title from "./comps/Title";
import Login from "./comps/Login";
import UploadForm from "./comps/UploadForm";
import ImageGrid from "./comps/ImageGrid";
import ImgModal from "./comps/ImgModal";
import CommentModal from "./comps/CommentModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import MySpace from "./comps/MySpace";

function App() {
    const [selectedImg, setSelectedImg] = useState(null);
    const [commentOpen, setCommentOpen] = useState({
        modal: false,
        id: null,
        personal: false,
        user: null,
    });

    return (
        <div className="App">
            <Router>
                <ToastContainer limit={3} />
                <Title />
                <Switch>
                    {/* TODO
                        1. Fix memory leaks
                    */}
                    <Route exact path="/">
                        <UploadForm />
                        <ImageGrid
                            setCommentOpen={setCommentOpen}
                            setSelectedImg={setSelectedImg}
                        />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/myspace">
                        <MySpace setSelectedImg={setSelectedImg} setCommentOpen={setCommentOpen} />
                    </Route>
                </Switch>
            </Router>
            {selectedImg && <ImgModal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
            {commentOpen.modal && (
                <CommentModal commentOpen={commentOpen} setCommentOpen={setCommentOpen} />
            )}
        </div>
    );
}

export default App;
