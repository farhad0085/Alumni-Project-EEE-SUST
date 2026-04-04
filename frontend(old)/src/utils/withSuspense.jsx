import React from "react";
import FullScreenLoading from "../components/loaders/FullScreenLoading";

const withSuspense = (WrappedComponent, FallbackComponent = null) => {

  return class extends React.Component {
    render() {
      if (!FallbackComponent) FallbackComponent = <FullScreenLoading />;
      return (
        <React.Suspense fallback={FallbackComponent}>
          <WrappedComponent {...this.props} />
        </React.Suspense>
      );
    }
  };
};

export default withSuspense;
