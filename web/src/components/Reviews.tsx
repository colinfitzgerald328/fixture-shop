import { Component } from 'react';
import { withLDConsumer } from 'launchdarkly-react-client-sdk';

const sorters = {
  newest: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  highest: (a, b) => b.rating - a.rating,
};

class Reviews extends Component {
  state = { sort: 'newest' };

  render() {
    const sortingEnabled = this.props.flags.reviewSorting;
    const reviews = sortingEnabled
      ? [...this.props.reviews].sort(sorters[this.state.sort])
      : this.props.reviews;

    return (
      <section>
        {sortingEnabled && (
          <label>
            Sort by{' '}
            <select value={this.state.sort} onChange={(e) => this.setState({ sort: e.target.value })}>
              <option value="newest">Newest</option>
              <option value="highest">Highest rated</option>
            </select>
          </label>
        )}
        <ReviewList items={reviews} />
        {this.props.flags.reviewPhotos && <PhotoStrip items={this.props.reviews} />}
      </section>
    );
  }
}

export default withLDConsumer()(Reviews);
