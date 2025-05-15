import { firestore } from '@/config/firebase';
import { collection, onSnapshot, query, QueryConstraint } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useFetchData = <T>(collectionName: string, constraints: QueryConstraint[] = []) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    console.log('collectionName ', collectionName);
    console.log('constraints ', constraints);
    


    useEffect(() => {
        if (!collectionName) return;
        const collectionRef = collection(firestore, collectionName);
        const q = query(collectionRef, ...constraints);
        console.log('query: ', query);
        
        const unsub = onSnapshot(q, (snapShot) => {
            console.log('snapShot ==> ', snapShot);
            const fetchedData = snapShot.docs.map(doc => {
                console.log('DOC ==> ', doc);
                
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }) as T[];
            setData(fetchedData);
            setLoading(false);
        }, (err) => {
            console.log('err: ===> ', err);
            
            setLoading(false);
            setError(err.message);
        });

        return () => unsub();
    }, [collectionName, JSON.stringify(constraints)]);


    return {
        data, loading, error
    }
}

export default useFetchData