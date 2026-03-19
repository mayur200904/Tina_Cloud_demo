interface StarterPageShellProps {
  pageName: string;
}

export default function StarterPageShell({ pageName }: StarterPageShellProps) {
  return (
    <main className="woc-starter-shell" aria-label={`${pageName} starter shell`}>
      <section className="woc-section woc-section--sm">
        <div className="woc-container">
          <p className="woc-starter-shell__copy">
            This page is ready for agent-generated Tina content.
          </p>
        </div>
      </section>
    </main>
  );
}
