// import { useState } from "react";
// import { useRouter } from "next/router";

// export default function SearchBar() {
//   const [query, setQuery] = useState("");
//   const router = useRouter();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     router.push(`/products?search=${encodeURIComponent(query)}`);
//   };

//   return (
//     <form onSubmit={handleSearch} className="w-full max-w-md">
//       <div className="relative">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search products..."
//           className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//         />
//         <button
//           type="submit"
//           className="absolute right-2 top-1/2 transform -translate-y-1/2"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 text-gray-500"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>
//       </div>
//     </form>
//   );
// }
