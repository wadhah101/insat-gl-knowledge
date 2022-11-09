import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import { contributors } from "@site/data/contributors";
import { Contributor } from "@site/data/Contributors.interface";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Start here ! Use at your own risk.
          </Link>
        </div>
      </div>
    </header>
  );
}
interface ContributorListProps {
  contributors: Contributor[];
}

const ContributorList: React.FC<ContributorListProps> = ({ contributors }) => {
  return (
    <div>
      <h2 className="text-3xl text-center pb-3"> CONTRIBUTORS </h2>
      <div className="grid gap-6 grid-cols-5">
        {contributors.map((e) => (
          <div key={e.id}>
            <a
              title={`${e.login}: ${e.contributions} contributions`}
              target="_blank"
              rel="noopener noreferrer"
              href={e.html_url}
            >
              <div className="flex flex-col">
                <img className="h-24 rounded-full h-24" src={e.avatar_url} />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const filteredContributors = contributors
  .filter((e) => e.login !== "ImgBotApp")
  .sort((e1, e2) => e2.contributions - e2.contributions);

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  console.log(filteredContributors);

  return (
    <Layout title={`Home`} description="">
      <HomepageHeader />
      <div className="py-20 grid place-items-center ">
        <ContributorList contributors={filteredContributors} />
      </div>
    </Layout>
  );
}
