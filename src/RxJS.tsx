import React, { FC, useState, useCallback, useEffect } from 'react';
import { Observable, Subscriber, of, interval, fromEvent, Subscription, PartialObserver, Observer, observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

const fromEventById = (elementId: string, eventName: string) => {
  const element = document.getElementById(elementId);
  if (element !== null) {
    return fromEvent(element, eventName);
  } else {
    return null;
  }
};

// const useObservable = <T extends {}>(observable: Observable<T> | null, callback: (observable_: Observable<T>) => Subscription) => {
//   console.log(`useObservable`);
//   useEffect(() => {
//     let observer: Subscription | null = null;
//     if (observable) {
//       observer = callback(observable);
//     }
//     return () => {
//       if (observer) {
//         observer.unsubscribe();
//       }
//     };
//   });
// };

function useObservable<T>(observable: Observable<T> | null, callback: (observable_: Observable<T>) => Subscription) {
  useEffect(() => {
    let observer: Subscription | null = null;
    if (observable) {
      observer = callback(observable);
    }
    return () => {
      if (observer) {
        observer.unsubscribe();
      }
    };
  }, [document]);
}

export const RxJS: FC = () => {
  const [click, setClick] = useState<number>(0);

  const onOf = useCallback(() => {
    of(1, 2, 3, 4, 5).subscribe({
      next: x => console.log(`x: ${x}`),
      complete: () => console.log(`complete`)
    })
  }, []);

  const onObservable = useCallback(() => {
    const observable = new Observable((observer: Subscriber<string>) => {
      observer.next('A');
      observer.next('B');
      observer.next('C');
      observer.complete();
    });

    let observer = observable.subscribe({
      next: (x) => console.log(`data: ${x}`),
      complete: () => console.log(`complete`)
    });

    observer.unsubscribe();
  }, []);

  const onInterval = useCallback(() => {
    const observable = interval(1000).pipe(take(10));

    let observer = observable.subscribe({
      next: x => console.log(`data: ${x}`),
      complete: () => console.log(`complete`)
    });
  }, []);

  useEffect(() => {
    const observer = fromEventById('yes', 'click')?.subscribe({
      next: (x) => {
        console.log(`click ${click + 1} times.`);
        setClick(click + 1);
      }
    });

    return () => {
      if (observer) {
        observer.unsubscribe();
      }
    };
  });

  return (
    <div>
      <button onClick={() => onObservable()}>Observable</button>
      <button onClick={() => onOf()}>of</button>
      <button onClick={() => onInterval()}>interval</button>
      <button id='yes'>fromEvent</button>
    </div>
  );
};