import './App.css';
import { graphql } from "@octokit/graphql";
import React, {useEffect, useState} from 'react';

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true)
  
  async function repo() {
    const { repository } = await graphql(
      /* 아래는 요청할 쿼리가 들어가는 영역 */
      `
        {
          repository(owner: "codestates-seb", name: "agora-states-fe") {
            discussions(first: 20) {
              edges {
                node {
                  title
                  url
                  author {
                    resourcePath
                  }
                }
              }
            }
          }
        }
      `,
      {
        headers: {
          authorization: `token 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`,
        },
      }
    );
    return repository;
  }

  useEffect(() => {
    repo()
    .then(res => {
      setData(res.discussions.edges)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="App">
      {isLoading? "loading..." : data.map((el, index) => {
        return <li key = {index}>
          <a href={el.node.url}>{el.node.title}</a>
          <span>{el.node.author.resourcePath}</span>
        </li>
      })}
    </div>
  );
}

export default App;