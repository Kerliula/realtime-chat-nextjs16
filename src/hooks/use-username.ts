import { useEffect, useState } from "react";
import { nanoid } from "zod";

const ANIMALS = ["cat", "dog", "fox", "lion", "tiger", "bear", "wolf"];
const STORAGE_KEY = "realtime-chat-username";

const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `anonymous-${word}-${nanoid(5)}`;
};

export const useUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const main = () => {
      let storedUsername = localStorage.getItem(STORAGE_KEY);

      if (!storedUsername) {
        storedUsername = generateUsername();
        localStorage.setItem(STORAGE_KEY, storedUsername);
      }

      setUsername(storedUsername);
    };

    main();
  }, []);

  return { username };
};
