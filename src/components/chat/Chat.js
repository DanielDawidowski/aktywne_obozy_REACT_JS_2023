import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { motion } from "framer-motion";
import "@components/chat/Chat.scss";

const Chat = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <motion.div
      className="chat"
      animate={{
        borderRadius: toggle ? 20 : 100,
        height: toggle ? 350 : 100,
        width: toggle ? 350 : 100
      }}
    >
      <motion.div className="chat__wrapper">
        {toggle && (
          <>
            <div className="chat__header">
              <FaWindowClose onClick={() => setToggle(!toggle)} />
            </div>
            <div className="chat__body">
              <div className="chat__register">
                <h1>siema</h1>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Chat;
