import { useEffect, useState } from "react";
import { db } from "../services";
import { collection, onSnapshot } from "firebase/firestore";

const useCollection = (c) => {
  const [collectionData, setCollectionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let ref = collection(db, c);

    const unsub = onSnapshot(ref, (snapshot) => {
      if (snapshot.empty) {
        setError("No user To Load ...!");
        setIsLoading(false);
      } else {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        setCollectionData(result);
        setIsLoading(false);
      }
    });

    return () => unsub();
  }, [collection]);

  return { collectionData, isLoading, error };
};
export default useCollection;

//   useEffect(() => {
//     setIsLoading(true);

//     const ref = collection(db, "users");

//     getDocs(ref).then((snapshot) => {
//       if (snapshot.empty) {
//         setError("No user To Load ...!");
//         setIsLoading(false);
//       } else {
//         let result = [];
//         snapshot.docs.forEach((doc) => {
//           result.push({ id: doc.id, ...doc.data() });
//         });
//         setData(result);
//         setIsLoading(false);
//       }

//       return () => {
//         setData(null);
//       };
//     });
//   }, []);
