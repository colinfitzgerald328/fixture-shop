import { Component } from 'react';
import { withLDConsumer } from 'launchdarkly-react-client-sdk';

class Reviews extends Component {
  render() {
    return (
      <section>
        <ReviewList items={this.props.reviews} />
        {this.props.flags.reviewPhotos && <PhotoStrip items={this.props.reviews} />}
      </section>
    );
  }
}

export default withLDConsumer()(Reviews);
