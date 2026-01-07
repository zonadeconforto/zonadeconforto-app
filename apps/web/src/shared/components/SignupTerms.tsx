/**
 * Signup terms and privacy agreement
 */
export default function SignupTerms() {
  return (
    <div className="flex items-start">
      <input type="checkbox" required className="mt-1 mr-2" />
      <label className="text-sm text-gray-600">
        Concordo com os{" "}
        <a href="#" className="text-blue-600 hover:text-blue-700">
          Termos de Uso
        </a>{" "}
        e{" "}
        <a href="#" className="text-blue-600 hover:text-blue-700">
          Política de Privacidade
        </a>
      </label>
    </div>
  );
}
