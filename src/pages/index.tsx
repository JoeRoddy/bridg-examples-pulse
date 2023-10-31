import { User } from '@prisma/client';
import bridg from 'bridg';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

let editCount = 0;

const BridgExample: NextPage = ({}) => {
  const [events, setEvents] = useState<any[]>([]);
  const [exampleUser, setExampleUser] = useState<User>();
  const subRef = useRef<any>();

  useEffect(() => {
    (async () => {
      await getInitialUser().then((user) => setExampleUser(user));

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
      <button
        onClick={() =>
          bridg.user.update({
            where: { id: exampleUser?.id },
            data: { name: 'name_edit_' + editCount++ },
          })
        }
      >
        update user data
      </button>
      <button onClick={() => subRef?.current?.stop()}>stop subscription</button>

      <div>Events:</div>
      {events.map((ev, i) => (
        <pre key={i}>{JSON.stringify(ev, null, 1)}</pre>
      ))}
    </div>
  );
};

export default BridgExample;

const getInitialUser = async () => {
  const user = await bridg.user.findFirst();
  if (user) return user;

  return bridg.user.create({
    data: {
      name: 'example user',
      email: 'john@gmail.com',
    },
  });
};
