import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

export default function ScoreChart({ evaluation }) {
  if (!evaluation) return null;

  const data = {
    labels: ["Clarity", "Depth", "Structure", "Accuracy"],
    datasets: [
      {
        label: "Original",
        data: [
          evaluation.clarity_A,
          evaluation.depth_A,
          evaluation.structure_A,
          evaluation.accuracy_A,
        ],
      },
      {
        label: "Optimized",
        data: [
          evaluation.clarity_B,
          evaluation.depth_B,
          evaluation.structure_B,
          evaluation.accuracy_B,
        ],
      },
    ],
  };

  return (
    <div className="card">
      <h2>📈 Score Comparison Chart</h2>
      <Bar data={data} />
    </div>
  );
}