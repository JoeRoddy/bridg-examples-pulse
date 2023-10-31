import bridg from 'bridg';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

let editCount = 0;

const BridgExample: NextPage = ({}) => {
  const [events, setEvents] = useState<any[]>([]);
  const subRef = useRef<any>();

  useEffect(() => {
    (async () => {
      // @ts-ignore - pulse subscribe types having issues, fixes to come
      const subscription = await bridg.user.subscribe({
        update: {
          after: {},
        },
      });
      if (subscription instanceof Error) return console.error('err', subscription);
      subRef.current = subscription;

      for await (const event of subscription) {
        const updateTime = event?.after.updatedAt;
        const now = Date.now();
        const diff = `${(now - updateTime) / 1000} seconds`;

        setEvents((ev) => [...ev, { ...event, updateTime: diff }]);
      }
    })();
  }, []);

  return (
    <div>
      <button onClick={() => subRef?.current?.stop()}>stop subscription</button>
      <button
        onClick={() =>
          bridg.user.update({
            where: { id: 'cloatpvh50000lfzata1de5ym' },
            data: { name: 'name_edit_' + editCount++ },
          })
        }
      >
        update user data
      </button>

      <div>Events:</div>
      {events.map((ev, i) => (
        <pre key={i}>{JSON.stringify(ev, null, 1)}</pre>
      ))}
    </div>
  );
};

export default BridgExample;
