/* The Foundation's name set round a ring, like a seal: typography on a path,
   with the emblem from the logo at its centre. Give each badge on a page its
   own id, since it names the path the words follow. */
export default function Badge({ id, text }: { id: string; text: string }) {
  return (
    <svg className="badge" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <path id={id} d="M 13,60 a 47,47 0 1,1 94,0 a 47,47 0 1,1 -94,0" />
      </defs>
      <text className="badge__ring">
        <textPath href={`#${id}`} textLength="294" lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
