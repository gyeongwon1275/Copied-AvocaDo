
import React from 'react';
import PropTypes from 'prop-types';
import WordCard from './WordCard';
import Pagination from './Pagination';
import { paginate } from '../utils/paginate';
import '../CSS/Wordbook.css';
import 'bootstrap/dist/css/bootstrap.css';

class WordList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wordData: this.props.wordData,
      pageSize: 5,
      currentPage: 1,
    };
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
      wordData,
      postInputWord,
      updateWordData,
      deleteWordData,
      handleSentenceData,
    } = this.props;
    const { length: count } = wordData;
    const { pageSize, currentPage, wordData: allData } = this.state;
    console.log('allData', allData);

    const words = paginate(allData, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="wordlist_wrap">
          <div className="wordlist_stack">
            {words
              ? words.map((word, index) => {
                  return (
                    <WordCard
                      key={index}
                      word={word.word}
                      sentences={word.sentences}
                      index={index}
                      postInputWord={postInputWord}
                      updateWordData={updateWordData}
                      deleteWordData={deleteWordData}
                      handleSentenceData={handleSentenceData}
                    />
                  );
                })
              : 'noWord!'}
          </div>
        </div>
        <Pagination
          pageSize={pageSize}
          itemsCount={count}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

WordList.propTypes = {
  addWordData: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSentenceData: PropTypes.func.isRequired,
  wordData: PropTypes.object.isRequired,
  postInputWord: PropTypes.func.isRequired,
  updateWordData: PropTypes.func.isRequired,
  deleteWordData: PropTypes.func.isRequired,
};


export default WordList;
