export default function ScoreCard({ evaluation }) {
  if (!evaluation) return null;

  const totalA =
    evaluation.clarity_A +
    evaluation.depth_A +
    evaluation.structure_A +
    evaluation.accuracy_A;

  const totalB =
    evaluation.clarity_B +
    evaluation.depth_B +
    evaluation.structure_B +
    evaluation.accuracy_B;

  return (
    <div className="card">
      <h2>📊 Evaluation Scorecard</h2>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Original</th>
            <th>Optimized</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clarity</td>
            <td>{evaluation.clarity_A}</td>
            <td>{evaluation.clarity_B}</td>
          </tr>
          <tr>
            <td>Depth</td>
            <td>{evaluation.depth_A}</td>
            <td>{evaluation.depth_B}</td>
          </tr>
          <tr>
            <td>Structure</td>
            <td>{evaluation.structure_A}</td>
            <td>{evaluation.structure_B}</td>
          </tr>
          <tr>
            <td>Accuracy</td>
            <td>{evaluation.accuracy_A}</td>
            <td>{evaluation.accuracy_B}</td>
          </tr>
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>{totalA}</strong></td>
            <td><strong>{totalB}</strong></td>
          </tr>
        </tbody>
      </table>

      <h3>
        🏆 Winner:{" "}
        {evaluation.winner === "A"
          ? "Original Prompt"
          : "Optimized Prompt"}
      </h3>

      <p><strong>Reason:</strong> {evaluation.reason}</p>
    </div>
  );
}
