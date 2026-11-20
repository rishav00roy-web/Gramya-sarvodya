import Icon from "@/components/Icon";
import type { IconName } from "@/lib/site";

/* A section whose material does not exist yet. It says what will be here
   and how to ask meanwhile, and never fills the space with made-up work. */
export default function Pending({
  items,
}: {
  items: { id: string; icon: IconName; title: string; text: string }[];
}) {
  return (
    <ul className="pending">
      {items.map((item) => (
        <li key={item.id} id={item.id} className="pending__item">
          <Icon name={item.icon} size={36} trigger="hover" />
          <h2 className="pending__title caps">{item.title}</h2>
          <p>{item.text}</p>
          <p className="pending__status">Nothing published yet.</p>
        </li>
      ))}
    </ul>
  );
}
