export function Space({ space = 12 }: { space?: number }) {
  return <div style={{ padding: `${space / 16}rem` }} />;
}