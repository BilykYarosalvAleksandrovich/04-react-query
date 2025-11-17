import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  async function handleAction(formData: FormData) {
    const query = formData.get("query")?.toString().trim() || "";

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
  }

  return (
    <header className={styles.header}>
      <form action={handleAction}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </header>
  );
}
