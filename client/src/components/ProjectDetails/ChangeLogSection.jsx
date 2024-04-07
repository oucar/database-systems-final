import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch } from "react-redux";

import { changelogProject } from "../../actions/projects";
import useStyles from "./styles";

const ChangeLogSection = ({ project }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [changelog, setComment] = useState("");
  const dispatch = useDispatch();
  const [changelogs, setComments] = useState(project?.changelogs);
  const classes = useStyles();
  const changelogsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(
      changelogProject(`${user?.result?.name}: ${changelog}`, project._id)
    );

    setComment("");
    setComments(newComments);

    changelogsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.changelogsOuterContainer}>
        <div className={classes.changelogsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Changelog
          </Typography>
          {changelogs?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={changelogsRef} />
        </div>
        <div style={{ width: "60%" }}>
          <Typography gutterBottom variant="h6">
            Changes you made:{" "}
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Your changes
"
            multiline
            value={changelog}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{
              marginTop: "10px",
              backgroundColor: "#2D4059",
              color: "white",
            }}
            fullWidth
            disabled={!changelog.length}
            variant="contained"
            onClick={handleComment}
          >
            Submit!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeLogSection;
