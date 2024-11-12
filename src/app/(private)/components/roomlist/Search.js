// React onChange search
import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    // 模擬一個搜索 API 函數
    const searchApi = async (query) => {
        // 這裡可以替換為實際的 API 請求
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([Result for "${query}"]);
            }, 500);
        });
    };

    const handleSearch = async (query) => {
        if (query) {
            const searchResults = await searchApi(query);
            setResults(searchResults);
        } else {
            setResults([]);
        }
    };

    // 使用 debounce 包裝 handleSearch 函數
    const debouncedSearch = debounce(handleSearch, 300);

    useEffect(() => {
        debouncedSearch(query);
        // 清理 debounced 函數
        return () => {
            debouncedSearch.cancel();
        };
    }, [query]);

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
