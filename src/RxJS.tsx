import React, { FC, useState, useCallback } from 'react';
import { Observable, Subscriber, of, interval, fromEvent } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

export const RxJS: FC = () => {

  const onOf = useCallback(() => {
    of(1, 2, 3, 4, 5).subscribe({
      next: x => console.log(`x: ${x}`),
      complete: () => console.log(`complete`)
    })
  }, []);

  return (
    <button onClick={() => onOf()}>of</button>
  );
};