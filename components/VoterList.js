import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import firebaseApp from "../firebase/clientApp";

export default function VoterList({ id, vote }) {
    const [value, loading, error] = useDocument(
        firebaseApp.firestore().doc(`users/${id}`)
    );
  
    if (loading) {
      return <h6>Loading...</h6>;
    }
  
    if (error) {
      return null;
    }

    console.log("here is user" + JSON.stringify(value.data()))
  
    return (
      <div
        style={{
          maxWidth: "320px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img
          style={{
            borderRadius: "50%",
            maxHeight: "48px",
            marginTop: "8px",
            marginRight: "8px",
          }}
          src={value.data()?.photoURL}
          referrerPolicy="no-referrer"
        />
        <div>
          <h4 style={{ marginBottom: 0 }}>{value.data()?.displayName}</h4>
          <h4 style={{ marginTop: 0 }}>
            Voted: {vote === "yes" ? "✔️🍍" : "❌🍍"}
          </h4>
        </div>
      </div>
    );
  }