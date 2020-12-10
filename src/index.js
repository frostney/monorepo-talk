import './ponyfills';

import React from 'react';
import ReactDOM from 'react-dom';

import {
  Appear,
  Box,
  CodePane,
  CodeSpan,
  Deck,
  FlexBox,
  FullScreen,
  Grid,
  Heading,
  Image,
  ListItem,
  Markdown,
  Notes,
  OrderedList,
  Progress,
  Slide,
  SpectacleLogo,
  Stepper,
  Text,
  Link,
  UnorderedList,
  indentNormalizer
} from 'spectacle';

import title from './assets/title.jpg';
import lerna from './assets/lerna.png';
import yarn from './assets/yarn.svg';
import step1 from './assets/step1.png';
import step2 from './assets/step2.png';
import step3 from './assets/step3.png';
import modular from './assets/modular_things.jpg';
import repetitivechanges from './assets/repetitivechanges.png';
import prchaos from './assets/prchaos.png';

// SPECTACLE_CLI_THEME_START
const theme = {
  fonts: {
    header: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: '"Open Sans Condensed", Helvetica, Arial, sans-serif'
  }
};
// SPECTACLE_CLI_THEME_END

// SPECTACLE_CLI_TEMPLATE_START
const template = ({ slideNumber, numberOfSlides }) => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Box padding="0 1em">
      <FullScreen />
    </Box>
    <Box padding="1em">
      <Text>{slideNumber} / {numberOfSlides}</Text>
    </Box>
  </FlexBox>
);
// SPECTACLE_CLI_TEMPLATE_END

const formidableLogo =
  'https://avatars2.githubusercontent.com/u/5078602?s=280&v=4';

const cppCodeBlock = indentNormalizer(`
#include <iostream>
#include <cstdlib>
#include <sstream>
#include <pthread.h>

struct thread_data_t
{
   int  thread_id;
   std::string message;
};

void *print_thread_message(void *thread_arg)
{
   struct thread_data_t *thread_data;
   thread_data = (struct thread_data_t *) thread_arg;

   cout << "Thread ID: " << thread_data->thread_id;
   cout << "Message: " << thread_data->message << endl;

   pthread_exit(NULL);
}

int main()
{
  pthread_t threads[NUM_THREADS];
  struct thread_data_t thread_data[NUM_THREADS];

  for (int i = 0; i < NUM_THREADS; i++)
  {
    auto curried_add = [](int x) -> function<int(int)> { return [=](int y) { return x + y; }; };
    auto answer = curried_add(i)(5);

    std::stringstream message;
    message << "The math result is " << answer << "!";
    thread_data.thread_id = i;
    thread_data.message = message.str();
    int err = pthread_create(&threads, NULL, print_thread_message, (void *)&thread_data[i]);

    if (err)
    {
      exit(-1)
    }
  }

  return 0;
}`);

const Presentation = () => (
  <Deck theme={theme} template={template} transitionEffect="fade">
    <Slide justifyContent="center">
          <Image src={title} />
            {/* <Layout>
              <Fill>
                <Text textColor="secondary">Johannes Stein</Text>
                <Text textColor="secondary" style={{ fontSize: "1.75rem" }}>Senior Front-End Developer at Gamesys</Text>
              </Fill>
              <Fill>
                <Text textColor="secondary">@frostney_</Text>
              </Fill>
            </Layout> */}
        </Slide>
        <Slide justifyContent="center">
          <Heading fontSize="h2">We 💖 modularity, don't we?</Heading>
        </Slide>
        <Slide>
          <Image src={modular} />
        </Slide>
        <Slide>
          <Heading fontSize="h3" textColor="secondary">
            Imagine a project growing over time
          </Heading>
        </Slide>
        <Slide>
          <Image src={step1} />
        </Slide>
        <Slide>
          <Image src={step2} />
        </Slide>
        <Slide>
          <Image src={step3} />
        </Slide>
        <Slide>
          <Heading fontSize="h2">What is a monorepo?</Heading>
          <Link href="https://developer.atlassian.com/blog/2015/10/monorepos-in-git/" textColor="secondary">developer.atlassian.com/blog/2015/10/monorepos-in-git/</Link>
        </Slide>
        <Slide>
          <Heading fontSize="h3">
            The repository contains more than one logical project
          </Heading>
        </Slide>
        <Slide>
          <Heading fontSize="h3">
            These projects are most likely unrelated, loosely connected or can be connected by other means
          </Heading>
        </Slide>
        <Slide>
          <Heading fontSize="h3">
            Multiple repositories
          </Heading>
          <CodePane source={require("raw-loader!./assets/polyrepo.example")} />
        </Slide>
        <Slide>
          <Heading fontSize="h3">
            Monorepo
          </Heading>
          <CodePane source={require("raw-loader!./assets/monorepo.example")} />
        </Slide>
        <Slide>
          <Heading fontSize="h2">
            What is working well
          </Heading>
        </Slide>
        <Slide bgColor="primary">
          <Heading fontSize="h3">
            Single lint, build, test and release process
          </Heading>
        </Slide>
        <Slide>
          <Heading fontSize="h4">
            Decentralized ESLint files...
          </Heading>
          <CodePane source={require("raw-loader!./assets/polyrepo.eslint.example")} />
        </Slide>
        <Slide>
          <Heading fontSize="h4">
            ...become centralized
          </Heading>
          <CodePane source={require("raw-loader!./assets/monorepo.eslint.example")} />
        </Slide>
        <Slide>
          <Heading fontSize="h4">
            Extend from centralized if necessary
          </Heading>
          <CodePane lang="json" source={require("raw-loader!./assets/eslintrc.example")} />
        </Slide>
        <Slide bgColor="primary">
          <Heading fontSize="h3">
            Easier to set up the development environment
          </Heading>
        </Slide>
        <Slide bgColor="primary">
          <Heading fontSize="h3">
            Easier to coordinate changes across the codebase
          </Heading>
        </Slide>
        <Slide>
          <Image src={repetitivechanges} />
        </Slide>
        <Slide>
          <Heading fontSize="h3">
            Removes dependencies on code reviews
          </Heading>
        </Slide>
        <Slide>
          <Image src={prchaos} />
        </Slide>
        <Slide>
          <Heading fontSize="h3">
            Removes the need to release common pieces of code
          </Heading>
        </Slide>
        <Slide>
          <Heading fontSize="h3">
            Simplifies end-to-end testing
          </Heading>
        </Slide>
        <Slide>
        <Heading fontSize="h2">
          Challenges
        </Heading>
      </Slide>
      <Slide>
        <Heading fontSize="h3">
          Intimidating codebase
        </Heading>
      </Slide>
      <Slide>
        <Heading fontSize="h3">
          Dealing with the size of monorepos
        </Heading>
      </Slide>
      <Slide>
        <Heading fontSize="h4">
          Check out single branch
        </Heading>
        <Appear>
          <CodeSpan>git clone myrepo --single-branch</CodeSpan>
        </Appear>
      </Slide>
      <Slide>
        <Heading fontSize="h4">
          Shallow clone
        </Heading>
        <Appear>
          <CodeSpan>git clone myrepo --depth=1</CodeSpan>
        </Appear>
        <br/><br/>
        <Appear>
          <CodeSpan>git clone myrepo --shallow-since=2017-01-01</CodeSpan>
        </Appear>
        <Appear>
        <Heading fontSize="h4">(Uses <CodeSpan>--single-branch</CodeSpan> by default)</Heading>
        </Appear>
      </Slide>
      <Slide>
        <Heading fontSize="h4">
          Git Large File Storage
        </Heading>
        <Link href="https://git-lfs.github.com">git-lfs.github.com</Link>
      </Slide>
      <Slide>
        <Heading fontSize="h3">
          Continous integration might need to be configured
        </Heading>
      </Slide>
      <Slide>
        <Heading fontSize="h3">
          Synchronization with Open Source repositories
        </Heading>
      </Slide>
      <Slide>
        <Heading fontSize="h4">
          Git submodules
        </Heading>
      </Slide>
      <Slide bgColor="primary">
        <Heading fontSize="h4">
          Compare commits
        </Heading>
        <Appear>
          <Heading fontSize="h4">
            Create patches
          </Heading>
        </Appear>
        <Appear>
          <Heading fontSize="h4">
            Apply patches on monorepo
          </Heading>
        </Appear>
      </Slide>
      <Slide>
        <Heading fontSize="h3">
          Ownership
        </Heading>
      </Slide>
      <Slide>
        <Heading fontSize="h4"><CodeSpan>CODEOWNERS</CodeSpan></Heading>
        <CodePane source={require("raw-loader!./assets/codeowners.example")} style={{ marginBottom: 40 }} />
        <Link href="https://help.github.com/articles/about-codeowners/">help.github.com/articles/about-codeowners/</Link>
      </Slide>
      <Slide>
          <Heading fontSize="h2">
            Tooling
          </Heading>
        </Slide>
        <Slide>
          <Heading fontSize="h3">
            It's just a bunch of folders
          </Heading>
          <br />
          <Appear>
          <Heading fontSize="h3">
            We need a tool to run the same command across multiple folders
          </Heading>
          </Appear>
        </Slide>
        <Slide>
          <Image src={lerna} />
          <br />
          <Link href="https://lernajs.io/">https://lernajs.io</Link>
        </Slide>
        <Slide>
          <Image src={yarn} />
          <br />
          <Link href="https://yarnpkg.com">https://yarnpkg.com</Link>
        </Slide>
        <Slide>
            <Heading caps lineHeight={1}>Thank you!</Heading>
            <Heading fontSize="h2">❤️</Heading>
            <Heading fontSize="h2">
            <Text>
              <Link href="http://frostney.github.io/talks/monorepo-nov2017">http://frostney.github.io/talks/monorepo-nov2017</Link>
            </Text>
            </Heading>
            {/* <Layout>
              <Fill>
                <Text textColor="secondary">@frostney_</Text>
              </Fill>
            </Layout> */}
          </Slide>
    <Slide>
      <FlexBox height="100%">
        <Heading margin="0px" fontSize="150px">
          The hard road from multi-repos to a monorepo
        </Heading>
      </FlexBox>
    </Slide>
    <Slide>
      <SpectacleLogo size={500} />
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="150px">
          ✨<i>Spectacle</i> ✨
        </Heading>
        <Heading margin="0px" fontSize="h2">
          A ReactJS Presentation Library
        </Heading>
        <Heading margin="0px 32px" color="primary" fontSize="h3">
          Where you can write your decks in JSX, Markdown, or MDX!
        </Heading>
      </FlexBox>
      <Notes>
        <p>
          Notes are shown in presenter mode. Open up
          localhost:3000/?presenterMode=true to see them.
        </p>
      </Notes>
    </Slide>
    <Slide
      backgroundColor="tertiary"
      backgroundImage="url(https://github.com/FormidableLabs/dogs/blob/main/beau.jpg?raw=true)"
      backgroundOpacity={0.5}
    >
      <Heading>Custom Backgrounds</Heading>
      <UnorderedList>
        <ListItem>
          <CodeSpan>backgroundColor</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>backgroundImage</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>backgroundOpacity</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>backgroundSize</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>backgroundPosition</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>backgroundRepeat</CodeSpan>
        </ListItem>
      </UnorderedList>
    </Slide>
    <Slide transitionEffect="slide">
      <Heading>Code Blocks</Heading>
      <Stepper
        defaultValue={[]}
        values={[
          [1, 1],
          [23, 25],
          [40, 42]
        ]}
      >
        {(value, step) => (
          <Box position="relative">
            <CodePane
              highlightStart={value[0]}
              highlightEnd={value[1]}
              fontSize={18}
              language="cpp"
              autoFillHeight
            >
              {cppCodeBlock}
            </CodePane>

            <Box
              position="absolute"
              bottom="0rem"
              left="0rem"
              right="0rem"
              bg="black"
            >
              {/* This notes container won't appear for step 0 */}

              {step === 1 && (
                <Text fontSize="1.5rem" margin="0rem">
                  This is a note!
                </Text>
              )}

              {step === 2 && (
                <Text fontSize="1.5rem" margin="0rem">
                  You can use the stepper state to render whatever you like as
                  you step through the code.
                </Text>
              )}
            </Box>
          </Box>
        )}
      </Stepper>
      <Text>
        Code Blocks now auto size and scroll when there is an overflow of
        content! They also auto-wrap longer lines.
      </Text>
    </Slide>
    <Slide>
      <Heading>Animated Elements</Heading>
      <OrderedList>
        <Appear elementNum={0}>
          <ListItem>Elements can animate in!</ListItem>
        </Appear>
        <Appear elementNum={2}>
          <ListItem>
            Just identify the order with the prop{' '}
            <CodeSpan>elementNum</CodeSpan>!
          </ListItem>
        </Appear>
        <Appear elementNum={1}>
          <ListItem>Out of order</ListItem>
        </Appear>
      </OrderedList>
    </Slide>
    <Slide>
      <FlexBox>
        <Text>These</Text>
        <Text>Text</Text>
        <Text color="secondary">Items</Text>
        <Text fontWeight="bold">Flex</Text>
      </FlexBox>
      <Grid gridTemplateColumns="1fr 2fr" gridColumnGap={15}>
        <Box backgroundColor="primary">
          <Text color="secondary">Single-size Grid Item</Text>
        </Box>
        <Box backgroundColor="secondary">
          <Text>Double-size Grid Item</Text>
        </Box>
      </Grid>
      <Grid
        gridTemplateColumns="1fr 1fr 1fr"
        gridTemplateRows="1fr 1fr 1fr"
        alignItems="center"
        justifyContent="center"
        gridRowGap={1}
      >
        {Array(9)
          .fill('')
          .map((_, index) => (
            <FlexBox paddingTop={0} key={`formidable-logo-${index}`} flex={1}>
              <Image src={formidableLogo} width={100} />
            </FlexBox>
          ))}
      </Grid>
    </Slide>
    <Slide>
      <Markdown>
        {`
          # Layout Tables in Markdown

          | Browser         | Supported | Versions |
          |-----------------|-----------|----------|
          | Chrome          | Yes       | Last 2   |
          | Firefox         | Yes       | Last 2   |
          | Opera           | Yes       | Last 2   |
          | Edge (EdgeHTML) | No        |          |
          | IE 11           | No        |          |
        `}
      </Markdown>
    </Slide>
    <Markdown containsSlides>
      {`
        ### Even write multiple slides in Markdown
        > Wonderfully formatted quotes

        1. Even create
        2. Lists in Markdown


        - Or Unordered Lists
        - Too!!
        Notes: These are notes
        ---
        ### This slide was also generated in Markdown!

        \`\`\`jsx
        const evenCooler = "is that you can do code in Markdown";
        // You can even specify the syntax type!
        \`\`\`

        ### A slide can have multiple code blocks too.

        \`\`\`c
        char[] someString = "Popular languages like C too!";
        \`\`\`

        Notes: These are more notes
      `}
    </Markdown>
  </Deck>
);

ReactDOM.render(<Presentation />, document.getElementById('root'));
