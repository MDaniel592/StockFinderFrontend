import SmallCustomPill from "components/pills/SmallCustomPill";

export default function UserAlertInStock({ isInStock }: { isInStock: boolean }) {
  if (isInStock) {
    return <SmallCustomPill textToShow="Disponible" type="SUCCESS" />;
  }
  return <SmallCustomPill textToShow="Sin stock" type="ERROR" />;
}
