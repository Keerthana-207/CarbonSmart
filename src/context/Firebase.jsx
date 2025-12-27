import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  onValue
} from "firebase/database";

/* ----------------------------------
   FIREBASE CONFIG
----------------------------------- */
const firebaseConfig = {
  apiKey: "AIzaSyBJD5Ax8K5KWocMcYbR4ywURqRUvBK9P-A",
  authDomain: "carbon-smart-3ce59.firebaseapp.com",
  databaseURL: "https://carbon-smart-3ce59-default-rtdb.firebaseio.com",
  projectId: "carbon-smart-3ce59",
  storageBucket: "carbon-smart-3ce59.firebasestorage.app",
  messagingSenderId: "484737021352",
  appId: "1:484737021352:web:2ff3231ee80bd6205ed99d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

/* ----------------------------------
   CONTEXT
----------------------------------- */
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

/* ----------------------------------
   PROVIDER
----------------------------------- */
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ----------------------------------
     AUTH METHODS
  ----------------------------------- */
  const signupUserWithEmailAndPassword = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const authUser = result.user;

    await set(ref(database, `users/${authUser.uid}`), {
      name: "",
      location: "",
      avatar: "",
      memberSince: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      }),
      createdAt: Date.now(),

      heatmap: {},
      heatmapCo2: {},
      streak: 0,
      badges: [],
      weeklySummary: ""
    });

    return authUser;
  };

  const signinUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signupWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const authUser = result.user;

    const userRef = ref(database, `users/${authUser.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      await set(userRef, {
        name: authUser.displayName || "",
        location: "",
        avatar: authUser.photoURL || "",
        memberSince: new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric"
        }),
        createdAt: Date.now(),

        heatmap: {},
        heatmapCo2: {},
        streak: 0,
        badges: [],
        weeklySummary: ""
      });
    }

    return authUser;
  };

  const logout = () => signOut(auth);

  /* ----------------------------------
     PROFILE UPDATE (Realtime DB)
  ----------------------------------- */
  const updateProfile = async (uid, data) => {
    if (!uid) throw new Error("Invalid UID for updateProfile");

    const userRef = ref(database, `users/${uid}`);
    await update(userRef, data); // Realtime Database update
    setProfile((prev) => ({ ...prev, ...data }));
  };

  /* ----------------------------------
     DAILY CHECK-IN
  ----------------------------------- */
  const logDailyActivity = async ({ level, co2Saved, summary }) => {
    if (!user || !profile) return;

    const todayKey = new Date().toDateString();
    const yesterdayKey = new Date(Date.now() - 86400000).toDateString();

    const prevHeatmap = profile.heatmap || {};
    const prevCo2 = profile.heatmapCo2 || {};

    const hadYesterdayActivity = prevHeatmap[yesterdayKey] > 0;
    const newStreak =
      level > 0 ? (hadYesterdayActivity ? profile.streak + 1 : 1) : profile.streak;

    const userRef = ref(database, `users/${user.uid}`);
    await update(userRef, {
      heatmap: { ...prevHeatmap, [todayKey]: level },
      heatmapCo2: { ...prevCo2, [todayKey]: co2Saved },
      streak: newStreak,
      weeklySummary: summary || profile.weeklySummary
    });
  };

  /* ----------------------------------
     AUTH + PROFILE LISTENER
  ----------------------------------- */
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setUser(authUser);

      const userRef = ref(database, `users/${authUser.uid}`);
      const unsubProfile = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.val());
        }
        setLoading(false);
      });

      return () => unsubProfile();
    });

    return () => unsubAuth();
  }, []);

  /* ----------------------------------
     CONTEXT VALUE
  ----------------------------------- */
  return (
    <FirebaseContext.Provider
      value={{
        user,
        profile,
        loading,

        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signupWithGoogle,
        logout,

        updateProfile,
        logDailyActivity
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
