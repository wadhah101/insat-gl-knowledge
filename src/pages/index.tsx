import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import { CONTRIBUTORS_DATA } from "@site/data/contributors";
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
    <div className="flex flex-col items-center w-full ">
      <h2 className="pb-3 text-3xl text-center"> CONTRIBUTORS </h2>
      <div className=" md:w-6/12">
        <div className="flex flex-wrap items-center justify-center gap-3 px-8 md:gap-6">
          {contributors.map((e) => (
            <div key={e.id}>
              <a
                title={`${e.login}: ${e.contributions} contributions`}
                target="_blank"
                rel="noopener noreferrer"
                href={e.html_url}
              >
                <div className="flex flex-col">
                  <img
                    className="w-16 h-16 rounded-full md:w-24 md:h-24"
                    src={e.avatar_url}
                  />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const blackList = ["ImgBotApp", "pre-commit-ci[bot]"];

const filteredContributors = CONTRIBUTORS_DATA.filter(
  (e) => !blackList.find((x) => x === e.login)
);

export default function Home(): JSX.Element {
  return (
    <Layout title={`Home`} description="">
      <HomepageHeader />
      <div className="grid py-20 place-items-center">
        <ContributorList contributors={filteredContributors} />
      </div>
    </Layout>
  );
}
